/**
 * 集合是由一组无序且唯一的项组成的。
 * set结构解决数组去重，数组求交集，并集，差集
 * 
*/
// class 封装集合类
class Gather{
    // constructor() {
    //     this.items = {}
    // }
    items = {}
    add(data) {
        if(!this.has(data)) {
            this.items[data] = data;
            return true
        }
        return false
    }
    delete(data) {
        if(this.has(data)) {
            delete this.items[data]
            return true
        }
        return false
    }
    has(data) {
        return data in this.items
    }
    clear() {
        this.items = {}
    }
    size() {
        return Object.keys(this.items).length
    }
    values() {
        return Object.values(this.items)
    }
}
const mset = new Gather()
mset.add(100)
mset.add(200)
mset.add(300)
mset.add(400)
// console.log(mset.size());
// console.log(mset.values);
// mset.clear()
// console.log(mset);
// es6 中的set 结构
let myset = new Set()
myset.add(100)
myset.add(200)
// console.log('1', myset.has(100));
// console.log('2', myset);
let values = myset.values();
// console.log('3', values.next());
// console.log('4', values.next());
// console.log('5', values.next());
//console.log('6', [...values])

//set应用
// 去重
const a = [1,2,3,4,5,6,1,2,3,4,5,6]
console.log('去重', [...new Set(a)]);
//并集
const b = new Set([1,2,3,4])
const c = new Set([2,3,4,5])
const d = new Set([...b, ...c])
console.log('并集', d);
//交集
const e = new Set([...b].filter(item=> c.has(item)))
console.log('交集', e);
//差集
const f = new Set([...b].filter(item=> !c.has(item)))
console.log('差集', f);