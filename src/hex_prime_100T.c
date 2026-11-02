#include <stdint.h>
#define GRID_MAX 12000000
#define TRIAL_COUNT 54
static uint32_t smallPrimes[TRIAL_COUNT];
static uint8_t bitmap[(GRID_MAX+7)/8];
__attribute__((export_name("primes_ptr"))) uint32_t primes_ptr(void){return (uint32_t)(uintptr_t)smallPrimes;}
__attribute__((export_name("bitmap_ptr"))) uint32_t bitmap_ptr(void){return (uint32_t)(uintptr_t)bitmap;}
// For 0<a,b,m<1e14 the fp quotient has <=0.03 absolute error.
// The wrapped 64-bit subtraction yields the exact signed residual.
// Tested against BigInt for 50,000 triples before release.
static inline uint64_t mulmod(uint64_t a,uint64_t b,uint64_t m){
    uint64_t q=(uint64_t)(((double)a*(double)b)/(double)m);
    int64_t r=(int64_t)(a*b-q*m);
    if(r<0)r+=(int64_t)m;
    else if((uint64_t)r>=m)r-=(int64_t)m;
    return (uint64_t)r;
}
__attribute__((export_name("mulmod_test"))) uint64_t mulmod_test(uint64_t a,uint64_t b,uint64_t m){return mulmod(a,b,m);}
static inline uint64_t powmod(uint64_t a,uint64_t d,uint64_t m){
    uint64_t x=1;
    for(a%=m;d;d>>=1){if(d&1)x=mulmod(x,a,m);a=mulmod(a,a,m);}
    return x;
}
static int prime(uint64_t n,uint32_t numPrimes){
    if(n==2)return 1;if(n<2 || !(n&1))return 0;
    for(uint32_t i=0;i<numPrimes&&i<TRIAL_COUNT;i++){
       uint32_t p=smallPrimes[i];if(!p)break;
       if(n==p)return 1;
       if(n%p==0)return 0;
       if((uint64_t)p*p>n)return 1;
    }
    uint64_t d=n-1;uint32_t s=0;
    while(!(d&1)){d>>=1;s++;}
    // Deterministic Miller-Rabin for n < 341550071728321.
    static const uint32_t witness[7]={2,3,5,7,11,13,17};
    for(uint32_t j=0;j<7;j++){
       uint64_t a=witness[j],x=powmod(a,d,n);
       if(x==1||x==n-1)continue;
       uint32_t k=1;
       for(;k<s;k++){x=mulmod(x,x,n);if(x==n-1)break;}
       if(k==s)return 0;
    }
    return 1;
}
__attribute__((export_name("prime_test"))) int prime_test(uint64_t n,uint32_t count){return prime(n,count);}
static int max32(int a,int b){return a>b?a:b;}
static int min32(int a,int b){return a<b?a:b;}
// Hex axial bitmap: bit index (r-ymin)*width+(q-xmin). Same as v1.4.5 JS.
__attribute__((export_name("compute"))) int compute(int xmin,int xmax,int ymin,int ymax,int h0,int h1,int count,uint64_t maxN){
    int64_t width=(int64_t)xmax-xmin+1,height=(int64_t)ymax-ymin+1;
    if(width<=0||height<=0||width*height>GRID_MAX||h1<h0)return -1;
    int byteCount=(int)((width*height+7)/8);
    for(int j=0;j<byteCount;j++)bitmap[j]=0;
    static const int dq[6]={0,-1,-1,0,1,1},dr[6]={-1,0,1,1,0,-1};
    for(int h=h0;h<=h1;h++){
       if(h<=0)continue;
       const int q0[6]={h,h,0,-h,-h,0},r0[6]={0,-h,-h,0,h,h};
       uint64_t start=3ULL*(uint64_t)h*(uint64_t)(h-1)+2;
       for(int side=0;side<6;side++){
          int lo=0,hi=h-1;
          if(dq[side]==0){if(q0[side]<xmin||q0[side]>xmax)continue;}
          else if(dq[side]>0){lo=max32(lo,xmin-q0[side]);hi=min32(hi,xmax-q0[side]);}
          else {lo=max32(lo,q0[side]-xmax);hi=min32(hi,q0[side]-xmin);}
          if(dr[side]==0){if(r0[side]<ymin||r0[side]>ymax)continue;}
          else if(dr[side]>0){lo=max32(lo,ymin-r0[side]);hi=min32(hi,ymax-r0[side]);}
          else {lo=max32(lo,r0[side]-ymax);hi=min32(hi,r0[side]-ymin);}
          if(lo>hi)continue;
          uint64_t first=start+(uint64_t)side*h+lo,last=start+(uint64_t)side*h+hi;
          if(last>maxN)last=maxN;
          if(first>last)continue;
          if(first<=2&&last>=2){
              int t=(int)(2-first)+lo,q=q0[side]+dq[side]*t,r=r0[side]+dr[side]*t;
              int index=(r-ymin)*(int)width+q-xmin;bitmap[index>>3]|=1U<<(index&7);
          }
          uint64_t n=first<=3?3:first|1ULL;
          if(n<first)n+=2;
          for(;n<=last;n+=2){
             if(!prime(n,(uint32_t)count))continue;
             int t=(int)(n-first)+lo,q=q0[side]+dq[side]*t,r=r0[side]+dr[side]*t;
             int index=(r-ymin)*(int)width+q-xmin;
             bitmap[index>>3]|=(uint8_t)(1U<<(index&7));
          }
       }
    }
    return byteCount;
}
void* memset(void *s,int c,unsigned long n){unsigned char *p=s;while(n--)*p++=(unsigned char)c;return s;}
