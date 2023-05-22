/**
 * 字典结构
 * 以[键，值]形式来存储元素
*/
class Dictionary{
    // constructor() {
    //     this.table = {}
    // }
    table = {}

    toStrFn(data) {
        if(data === null) {
            return 'NULL'
        } else if(data === undefined) {
            return 'UNDEFINED'
        } else if(typeof data === 'string' || data instanceof String) {
            return data
        }
        return JSON.stringify(data)
    }
    hasKey(key){
        return this.table[this.toStrFn(key)] != null
    }
    set(key, value) {
        if(key!=null && value!=null) {
            const tableKey = this.toStrFn(key)
            this.table[tableKey] = new ValuePair(key, value)
            return true
        }
        return false
    }
    get(key) {
        const valuepair = this.table[this.toStrFn(key)]
        return valuepair == null ? undefined : valuepair.value
    }
    remove(key) {
        if(this.hasKey(key)) {
            delete this.table[this.toStrFn(key)]
            return true
        }
        return false
    }
    keys() {
        return this.keyValues().map(item=> item.key)
    }
    values() {
        return this.keyValues().map(item=> item.value)
    }
    keyValues() {
        return Object.values(this.table)
    }
    size() {
        return Object.keys(this.table).length
    }
    isEmpty() {
        return this.size() === 0
    }
    clear() {
        this.table = {}
    }
    forEach(cb) {
        const valuepair = this.keyValues()
        for(let i=0; i<valuepair.length; i++) {
            cb(valuepair[i].key, valuepair[i].value)
        }
    }

}
class ValuePair{
    constructor(key,value) {
        this.key = key;
        this.value = value
    }
}

const mmap = new Dictionary()
// console.log( mmap.toStrFn(null) )
// console.log( mmap.toStrFn(undefined) )
// console.log( mmap.toStrFn({a: 1}) )
// console.log( mmap.toStrFn([1,2,3]) )
// console.log( mmap.toStrFn('age') )
let obj = {name: '123'}
// console.log( mmap.toStrFn(obj) )
mmap.set('name', 'xiaoming')
mmap.set('age', '20')
mmap.set('sex', '男')
mmap.set('high', '190')
// console.log( mmap.hasKey('name') )
// console.log( mmap.get('name') )
// console.log( mmap.remove('name') )
// console.log( mmap.keys() )
// console.log( mmap.values() )
// console.log( mmap.keyValues() )
// console.log( mmap.size() )
// console.log( mmap.isEmpty() )
// mmap.forEach((key,value)=>{
//     console.log('foreach-',key,value)
// })
// console.log(mmap)

/**
 * 散列表，提高字典效果
 * 1、字典数据比较多，
 * 2、key值比较复杂
*/
class HashTable {
    table = {}

    toStrFn(data) {
        if(data === null) {
            return 'NULL'
        } else if(data === undefined) {
            return 'UNDEFINED'
        } else if(typeof data === 'string' || data instanceof String) {
            return data
        }
        return JSON.stringify(data)
    }

    // hashCode(key) { // hash 散列函数的算法
    //     // 生成hash值作为key
    //     // 1.对象 =》 字符串
    //     // 2.charAtCode +
    //     // 3. %
    //     if(typeof key === 'number') {
    //         return key
    //     }
    //     const tableKey = this.toStrFn(key)
    //     let hash = 0
    //     for(let i=0; i<tableKey.length; i++) {
    //         hash += tableKey.charCodeAt()
    //     }
    //     return hash % 37
    // }
    hashCode(key) { //社区推荐散列函数算法
        const tableKey = this.toStrFn(key)
        let hash = 5381;
        for(let i=0; i<tableKey.length; i++) {
            hash = (hash * 33) + tableKey.charCodeAt(i)
        }
        return hash % 1013
    }

    set(key, value) {
        if(key!=null && value!=null) {
            const position = this.hashCode(key)
            this.table[position] = new ValuePair(key, value)
            return true
        }
        return false
    }
    get(key) {
        const valuepair = this.table[this.hashCode(key)]
        return valuepair == null ? undefined : valuepair.value
    }
    remove(key) {
        const hash = this.hashCode(key)
        const valuepair = this.table[hash]
        if(valuepair != null) {
            delete this.table[hash]
            return true
        }
        return false
    }


}
const hmap = new HashTable()
hmap.set('name', 'xiaoming')
hmap.set({a:1}, 'aaaaa')
hmap.set('kervern', '111')
hmap.set('Jack', '111')
hmap.set({a:1}, 'aaaaa')
// console.log('2', hmap.get({a:1}));
// console.log('1', hmap.remove('name'));
// console.log('1', hmap);

/**
 * es6中的map
 * 
*/
let nmap = new Map()
nmap.set('name', 'xiaoming')
let a = {a: 1}
nmap.set(a, 'xiaoming')
//nmap.delete(a)
// console.log(nmap.get(a))
// console.log(nmap.keys())
// console.log([...nmap.entries()])
// console.log([...nmap.values()])
// console.log(nmap)

/**
 * es6中的weakmap
*/
const wmap = new WeakMap()
let aa = {a: 2}

wmap.set(aa, 'aaaaa')
aa = null
console.log(wmap);