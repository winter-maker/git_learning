// 原型为object
let x = {}, y = {};
//console.log('x=y-', Object.getPrototypeOf(x)===Object.getPrototypeOf(y));
// 原型为null
let z = Object.create(null, {name: {value: 'c'}})
console.dir(z);
