import "@babel/polyfill"
const a = '123'; // const 关键字
const add = (a,b)=> a + b; //箭头函数
const set = new Set([1,2,3]) // set集合
const p = new Promise((resolve, reject)=>{
    resolve('1')
})