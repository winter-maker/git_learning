/***
 * 数组结构
 * 数据的集合
 * 
*/
// 创建数组
let arr = new Array(1,2,3);

let arr2 = [3,4,5]
console.log(arr2)
console.log(arr[0], arr[2])
for(let i=0; i<arr.length; i++){
    console.log(arr[i])
}
// 数组的方法: poush pop shift unshift splice sort concat
// every some filter map foreach reduce
arr.push(4)
arr.pop()
arr.shift()
arr.unshift(1)
//arr.splice(0,2)
arr.splice(0,1,5)
console.log(arr)
let arr3 = [3,2,4,6,5]
arr3.sort((x,y)=> y-x)
let arr4 = [
    {name: '1', age: 100},
    {name: '2', age: 18},
    {name: '3', age: 20}
]
arr4.sort((x,y)=> y.age-x.age)
console.log(arr3)
console.log(arr4)
let arr5 = [1,2,3]
let arr6 = [4,5,6]
console.log(arr5.concat(arr6, 7,8,9,10,''))
let arr7 = [10,11,12,13,14]
console.log(arr7.every(item=>item>10))
console.log(arr7.some(item=>item>14))
console.log(arr7.filter(item=>item>=12))
console.log(arr7.map(item=>item+'av'))

arr4.forEach(item=>item.name = item.name+'av')
console.log(arr4)
let sum = arr7.reduce((item1, item2)=>item1+item2)
console.log(sum)
// 迭代器对象
// for(let i of arr7){
//     console.log(i)
// }
console.log(arr7.entries())
for(let i of arr7.entries()){
    console.log(i)
}
console.log(arr7.keys())
for(let i of arr7.keys()){
    console.log(i)
}
console.log(arr7.values())
for(let i of arr7.values()){
    console.log(i)
}
// Array.from(arguments)
// indexOf, lastIndexOf , find ,findIndex, findLast, findLastIndex, includes
console.log(arr.indexOf(3))
console.log(arr.includes(9))
console.log(arr7.find(x=> x>1))
console.log(arr7.findIndex(x=> x>1))
let arr8 = [
    [1,2,3,4,5],
    [11,22,33,44,55],
    [111,222,333,444,555]
]
for(let i=0; i<arr8.length; i++){
    console.log(`--第${i+1}个人的成绩`, arr8[i])
    for(let j=0; j< arr8[i].length; j++){
        console.log(arr8[i][j])
    }
}
//console.log(arr7.findLast(x=> x>1))
