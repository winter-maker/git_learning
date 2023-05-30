/**
 * 递推
 * 
 * 套路总结
 * 遇到大数据量的题，不知道从哪里下手，通常离不开递归与递推公式。
 * 原则：大事化小小事化了
 * 1.找隐藏条件，理解题意。
 * 2.找极值，比如0或者1的情况下结果是多少。
 * 3.拆解找规律，写公式。（缩小数据范围）
*/
/**
 * @title 斐波那契应用
 * @param n
 * @description 定义：f(0)=0, f(1)=1, f(n)=f(n-1)+f(n-2), 其中n>1
 * 
 * */
let fib = (n)=>{
    // 递归形式
    // if(n<=1){
    //     return n
    // }
    // return fib(n-1) + fib(n-2)

    //递推形式
    const arr = [0,1]
    for(let i=2; i<=n; i++) {
        arr[i] = arr[i-1] + arr[i-2]
    }
    return arr[n-1] + arr[n-2]
} 
//console.log(fib(10))

const climbStairs = (n)=>{
    if(n<=3) {
        return n
    }
    //n>=4
    // 递归形式，时间复杂度是最高的
    //return climbStairs(n-1) + climbStairs(n-2)

    //递推优化，运算过的缓存下来
    let a = [0,1,2,3]
    for(let i=4; i<n; i++) {
        a[i] = a[i-1] + a[i-2]
    }
    return a[n-1] + a[n-2]
}
//console.log(climbStairs(10))
//放苹果
const recursion = (m, n)=> {
    if(m < 0) {
        return 0
    }
    // 一个苹果或者一个盘子，只有一种放法
    if(m==0 || m==1 || n==1){
        return 1
    }
    //1. 所有盘子放满了
    //2. 空了1个盘子
    return recursion(m-n, n) + recursion(m, n-1)
}
console.log(recursion(7,3))