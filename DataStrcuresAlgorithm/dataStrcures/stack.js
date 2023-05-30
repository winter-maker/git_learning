/***
 * 栈结构
 * 后进先出
 * 只能在表未元素进入push，pop操作，不能在中间进行操作
 * 
*/

// 设计,封装栈
// push 添加元素到栈顶
// pop 出栈
// peek 返回栈顶
// isEmpty() clear()
// size()
class Stack{
    // constructor() {
    //     this.items = []
    // }
    // 加 # 表示私有属性
    #items = []

    pop() {
        return this.#items.pop()
    }
    push(data) {
        this.#items.push(data)
    }
    peek() {
        //return this.items[this.#items.length - 1]
        return this.#items.at(-1)
    }
    isEmpty() {
        return this.#items.length == 0
    }
    size() {
        return this.#items.length
    }
    clear() {
        this.#items = []
    }
    toString() {
        return this.#items.join('')
    }
}
const sta = new Stack();
sta.push(4)
sta.push(5)
sta.push(6)
console.log(sta.peek())
sta.pop()
console.log(sta.peek())
sta.push(7)
sta.push(8)
sta.push(9)
//console.log(sta.#items)
console.log(sta.peek())

// 十进制到二进制的转换
function convert(decNumber) {
    let remStack = new Stack()
    let number = decNumber;

    let string = "";
    while(number>0) {
        remStack.push( number%2 )
        number = Math.floor( number / 2 )
    }

    while(!remStack.isEmpty()) {
        string += remStack.pop()
    }

    return string;

}
console.log( convert(50) )
// 任意进制转换
function ryConvert(decNumber, base) {
    let remStack = new Stack()
    let number = decNumber;
    let baseString = '0123456789ABCDEF'

    let string = "";
    while(number>0) {
        remStack.push( number % base )
        number = Math.floor( number / base )
    }

    while(!remStack.isEmpty()) {
        // 兼容16进制
        string += baseString[ remStack.pop() ]
    }

    return string;

}
console.log( ryConvert(500, 16) )