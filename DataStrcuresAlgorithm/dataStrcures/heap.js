/**
 * 堆
 * 二叉堆是一种特殊的二叉树
 * 
*/
const Compare = {
    less: -1,
    bigger: 1,
    equ: 0
}
class MinHeap {
    heap = []
    getLeftIndex(index) {
        return 2*index + 1
    }
    getRightIndex(index) {
        return 2*index + 2
    }
    compareFn(a, b) {
        if(a === b) {
            return Compare.equ
        }
        return a<b? Compare.less : Compare.bigger
    }
    // 算都父节点索引
    getParentIndex(index) {
        return Math.floor((index - 1)/2)
    }
    insert(value) {
        if(value != null) {
            this.heap.push( value )
            // 与父节点逐级对比，如果比父节点小就要交换位置
            // 
            this.shiftUp(this.heap.length-1)
            return true
        }
        return false
    }
    shiftUp(index) {
        let parent = this.getParentIndex(index)
        while(
            index >0 &&
            this.compareFn(this.heap[parent], this.heap[index]) === Compare.bigger
        ) {
           this.swap(this.heap, parent, index)
           index = parent
           parent = this.getParentIndex(index)
        }
    }
    swap(array, a, b) {
        const temp = array[a]
        array[a] = array[b]
        array[b] = temp
    }
    size() {
        return this.heap.length
    }
    isEmpty() {
        return this.size() === 0
    }
    findTarget() {
        return this.heap[0]
    }
    // 删除
    extract(index) {
        if(this.isEmpty()) {
            return
        }
        if(this.size() === 1) {
            return this.heap.shift()
        }
        const removed = this.heap[index]
        this.heap[index] = this.heap.pop()

        this.shiftDown(index)
        return removed
    }
    shiftDown(index) {
        let current = index
        let left = this.getLeftIndex(index)
        let right = this.getRightIndex(index)
        let size = this.size()
        if(
            left< size &&
            this.compareFn(this.heap[current], this.heap[left]) === Compare.bigger) {
            current = left
        }

        if(
            right<size &&
            this.compareFn(this.heap[current], this.heap[right]) === Compare.bigger) {
            current = right
        }
        if(index !== current) {
            this.swap(this.heap, index, current)
            this.shiftDown(current)
        }
    }
}
const heap = new MinHeap()

heap.insert(1)
heap.insert(3)
heap.insert(2)
heap.insert(4)
heap.insert(5)
heap.extract(0)
//console.log('1',heap);

/**
 * 最大堆
*/
class MaxHeap extends MinHeap {
    constructor() {
        super();
    }

    compareFn(a, b) {
        if (a === b) {
            return Compare.equ
        }
        return a > b ? Compare.less : Compare.bigger
    }
}
const mheap = new MaxHeap()

mheap.insert(1)
mheap.insert(3)
mheap.insert(2)
mheap.insert(4)
mheap.insert(5)
// mheap.extract(0)
console.log('2', mheap);