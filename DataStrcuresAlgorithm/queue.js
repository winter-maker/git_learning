/**
 * 队列
 * 先进先出
 * 任务队列
*/

class Queue {
    //1. #items = []
    #items = {}
    #lowCount = 0 // 删除值的索引
    #count = 0 // 队列的个数
    // 入队
    enqueue(data) {
        //1. this.#items.push(data)
        this.#items[this.#count] = data;
        this.#count++;
    }
    // 出队
    dequeue() {
        //1. shift删完后整体会往前挪,性能不高，效率低下。
        // return this.#items.shift()
        if(this.isEmpty()) {
            return;
        }
        let res = this.#items[this.#lowCount]
        delete this.#items[this.#lowCount]
        this.#lowCount++
        return res
    }
    // 返回队头
    front() {
        //1. return this.#items.at(0)
        return this.#items[this.#lowCount]
    }
    //
    isEmpty() {
        // 1. return this.#items.length === 0;
        return this.size() === 0;
    }
    //
    size() {
        //return this.#items.length
        return this.#count - this.#lowCount
    }
    clear() {
        // 1. this.#items = []
        this.#items = {}
        this.#count = 0
        this.#lowCount = 0
    }
    toString() {
        //1. return this.#items.join('')
        let str = ''
        for(let i=this.#lowCount; i<this.#count; i++){
            str += `${this.#items[i] }`
        }
        return str;
    }

}
//1.
// const que = new Queue();
// console.log(que.isEmpty())
// que.enqueue('xiaoming')
// que.enqueue('haipeng')
// que.enqueue('wenjie')
// console.log(que.size());
// console.log(que.front());

//2.
const que = new Queue()
que.enqueue('1')
que.enqueue('2')
que.enqueue('3')
console.log(que)

// 队列应用：击鼓传花
// 队头掐掉放到队尾
function game(list, num) {
    const queue = new Queue();
    for(let i=0; i<list.length; i++) {
        queue.enqueue(list[i])
    }
    while(queue.size()>1) {
        for(let i=0; i<num; i++) {
            queue.enqueue( queue.dequeue() );

        }
        console.log(queue.dequeue(), '淘汰了')
    }
}
game(['kervin', 'xiaoming', 'tiechui', 'gangdaer', 'gulu'], 7)

/**
 * 双端队列
 * 可以在队头添加删除元素，可以在队尾添加删除元素
 * 应用：超市排队，vscode记录撤回
*/
class DeQueue{
    #items = {}
    #lowCount = 0 // 删除值的索引
    #count = 0 // 队列的个数
    // 队尾加
    addBack(data) {
        this.#items[this.#count] = data;
        this.#count++;
    }
    // 队头删
    removeFront() {
        if(this.isEmpty()) {
            return;
        }
        let res = this.#items[this.#lowCount]
        delete this.#items[this.#lowCount]
        this.#lowCount++
        return res
    }
    // 队头加
    addFront(data) {
        //1. 如果未空
        if(this.isEmpty()) {
            this.addBack(data)
        } else {
            //2. lowCount>0 ,删除的个数
            if(this.#lowCount>0){
                this.#lowCount--;
                this.#items[this.#lowCount] = data
            } else {
                //lowCount ==0;
                for(let i=this.#count; i>0; i--) {
                    this.#items[i] = this.#items[i-1]
                }
                this.#items[0] = data
                this.#count++;
            }
        }
        
    }

    // 队尾删
    removeBack() {
        if(this.isEmpty()) {
            return
        }
        this.#count--
        const res = this.#items[this.#count]
        delete this.#items[this.#count]
        return res;
    }

    // 返回队头
    peekFront() {
        return this.#items[this.#lowCount]
    }
    // 返回队尾
    peekBack() {
        if(this.isEmpty()) {
            return
        }
        return this.#items[this.#count-1]
    }

    //
    isEmpty() {
        return this.size() === 0;
    }
    size() {
        return this.#count - this.#lowCount
    }
    clear() {
        this.#items = {}
        this.#count = 0
        this.#lowCount = 0
    }
    toString() {
        let str = ''
        for(let i=this.#lowCount; i<this.#count; i++){
            str += `${this.#items[i] }`
        }
        return str;
    }
}
let dequue = new DeQueue();
dequue.addBack(100)
dequue.addBack(200)
dequue.addBack(300)
dequue.addBack(400)
dequue.addBack(500)
dequue.addBack(600)
dequue.addFront(10)
dequue.addFront(20)
console.log(dequue.size())
console.log(dequue.toString())
dequue.removeBack()
dequue.removeBack()
console.log(dequue.size())
console.log(dequue.toString())
console.log(dequue.peekBack())
console.log(dequue.peekFront())
console.log(dequue.isEmpty())

/**
 * 双端队列应用： 
 * 回文检查 dad，假似真时真似假 正读和反读是一样的
 * 
*/
function test(str) {
    // 转换成小写；去掉字符中的所有空格
    const lowstr = str.toLocaleLowerCase().split(" ").join("")
    
    //
    let dequeue = new DeQueue();
    for(let i=0; i<lowstr.length; i++) {
        dequeue.addBack( lowstr[i] )
    }
    //console.log(dequeue.toString())
    //
    let isEqual = true;
    while( dequeue.size() > 1) {
        if(dequeue.removeBack() !== dequeue.removeFront()) {
            isEqual = false;
            break;
        }
    }
    return isEqual;

}
console.log( test('D A a d  '))
console.log( test('abba'))
console.log( test('aba'))
console.log( test('aba'))
console.log( test('假似真时真似假'))
console.log( test('假似真时真似假f'))
