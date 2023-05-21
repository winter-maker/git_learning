/**
 * 链表
*/

// 单链表
// 把数组的缺点给弥补上了
class Node{
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}
class LinkedList{
    //#
    constructor() {
        this.count = 0;
        this.head = null;
    }
    //push
    push(data) {
        const node = new Node(data);
       // console.log(node)

        //header是空
        if(this.head === null) {
            this.head = node;
        } else {
            let current = this.head;

            while(current.next !== null) {
                current = current.next
            }
            current.next = node;
        }
        this.count++;
    }
    //删除
    //根据索引删除
    removeAt(index) {
        if(index>=0 && index< this.count) {
            let current = this.head
            if(index === 0) {
                this.head = this.head.next
            } else {
                // 方案1
                // let previous
                // for(let i=0; i<index; i++) {
                //     previous = current
                //     current = current.next
                // }

                //方案2
                let previous = this.getNodeAt(index - 1)
                current = previous.next
                previous.next = current.next

            }
            this.count--
            return current.element
        }
        return;
    }

    //根据值找到索引
    indexOf(element) {
        let current = this.head;
        for(let i=0; i<this.count; i++) {
            if(this.equalFn(element, current.element)) {
               return i; 
            }
            current = current.next
        }
        return -1;
    }
    equalFn(a, b) {
        //return a === b;
        //1. 判断是对象，对象[key] === 对象2[key]
        //2. 之前的基础上，写一个递归函数，深度检查是否相等

        return JSON.stringify(a) === JSON.stringify(b)
        // imumutable

    }
    remove(element) {
        let index = this.indexOf(element)
        return this.removeAt(index)
    }
    insert(element, index) {
        if(index >=0 && index<=this.count) {
            const node = new Node(element)
            if(index === 0) {
                const current = this.head;
                node.next = current;
                this.head = node;
            } else {
                const previous = this.getNodeAt(index - 1)
                const current = previous.next
                
                node.next = current
                previous.next = node
            }
            this.count++
            return true
        }
        return false
    }
    //获取当前索引的节点 
    getNodeAt(index) {
        if(index>=0 && index<this.count) {
            let node = this.head;
            for(let i=0; i<index; i++) {
                node = node.next
            }
            return node
        }
        return
    }
    isEmpty() {
        return this.size() === 0
    }
    size() {
        return this.count
    }
    getHead() {
        return this.head
    }

}
// 单链表应用
// 检查回文字符串
function test(str) {
    // 转换成小写；去掉字符中的所有空格
    const lowstr = str.toLocaleLowerCase().split(" ").join("")
    
    //
    let dequeue = new LinkedList();
    for(let i=0; i<lowstr.length; i++) {
        dequeue.push( lowstr[i] )
    }
    //console.log(dequeue.toString())
    //
    let isEqual = true;
    while( dequeue.size() > 1) {
        if(dequeue.removeAt(0) !== dequeue.removeAt(dequeue.size()-1)) {
            isEqual = false;
            break;
        }
    }
    return isEqual;

}
// console.log( test('D A a d  '))
// console.log( test('abba'))
// console.log( test('abbc'))
// 击鼓传花应用
function game(list, num) {
    const queue = new LinkedList();
    for(let i=0; i<list.length; i++) {
        queue.push(list[i])
    }
    while(queue.size()>1) {
        for(let i=0; i<num; i++) {
            queue.push( queue.removeAt(0) );

        }
        console.log(queue.removeAt(0), '淘汰了')
    }
    return queue.removeAt(0)
}
//game(['kervin', 'xiaoming', 'tiechui', 'gangdaer', 'gulu'], 7)

//const list = new LinkedList()
// list.push(100)
// list.push(200)
// list.push(300)
// list.push(400)
// list.push(500)
// list.push(600)

// list.insert(11,1)
// console.log(list.getHead())
// console.log(list)

// 双向链表
class DoublyNode extends Node{
    constructor(element) {
        super(element)
        this.prev = null
    }
}

class DoublyLinkdList extends LinkedList {
    constructor() {
        super()
        this.tail = null;
    }
    push(data) {
        const node = new DoublyNode(data)
        // prev next
        if(this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node
        }
        this.count++
    }
    insert(element, index) {
        if(index>=0 && index<=this.count) {
            const node = new DoublyNode(element)
            let current = this.head
            if(index === 0) {
                if(this.head === null) {
                    this.head = node;
                    this.tail = node;
                } else {
                    node.next = this.head;
                    this.head.prev = node;
                    this.head = node;
                }
            } else if(index === this.count){
                current = this.tail;
                current.next = node;
                node.prev = current
                this.tail = node;
            } else {
                const previous = this.getNodeAt(index-1)

                current = previous.next;

                node.next = current;
                current.prev = node;
                previous.next = node;
                node.prev = previous;

            }
            this.count++
            return true;
        }
        return false;
    }
    removeAt(index) {
        if(index >= 0 && index<this.count) {
            let current = this.head
            if(index === 0) {
                this.head = current.next
                if(this.count === 1) {
                    this.tail = null
                } else {
                    this.head.prev = null
                }
            } else if(index === this.count-1) {
                current = this.tail;
                this.tail = current.prev;
                this.tail.next = null;
            } else {
                let previous = this.getNodeAt(index - 1)
                current = previous.next
                previous.next = current.next
                current.next.prev = previous;
            }
            this.count--;
            return current.element
        }
        return;
    }
    getHead() {
        return this.head
    }
    getTail() {
        return this.tail
    }
}

// let list = new DoublyLinkdList()
// list.push(100)
// list.push(200)
// list.insert(300,2)
// list.insert(400,3)
// list.removeAt(2)
// console.log(list)

//循环链表
class CirularLinkedList extends LinkedList{
    constructor() {
        super()
    }
    push(element) {
        const node = new Node(element)
        let current
        if(this.head === null) {
            this.head = node;
        } else {
            current = this.getNodeAt(this.size() - 1)
            current.next = node
        }
        node.next = this.head
        this.count++
    }
    insert(element, index) {
        if(index>=0 && index<=this.count) {
            const node = new Node(element)
            let current = this.head
            if(index === 0) {
                if(this.head == null) {
                    this.head = node;
                    node.next = this.head;
                } else {
                    node.next = current
                    current = this.getNodeAt(this.size() - 1)

                    this.head = node
                    current.next = this.head
                }
            } else {
                const previous = this.getNodeAt(index - 1)
                node.next = previous.next
                previous.next = node

            }
            this.count++
            return true
        }
        return false
    }
    removeAt(index) {
        if(index>=0 && index<this.count) {
            let current = this.head
            if(index === 0) {
                if(this.size() === 1) {
                    this.head = null
                } else {
                    let last = this.getNodeAt(this.size() - 1)
                    this.head = this.head.next
                    last.next = this.head
                    
                }
            } else {

                const previous = this.getNodeAt(index - 1);
                current = previous.next;
                previous.next = current.next;// 如果删的是最后一个也不怕，current.next 是head

            }
            this.count--
            return current.element
        }
        return
    }
}
let list = new CirularLinkedList();
list.push(100)
list.push(200)
list.insert(300,0)
//list.insert(400,0)
list.removeAt(1)
// list.insert(500,0)
console.log(list)