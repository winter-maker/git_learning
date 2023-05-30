/**
 * 树是一种分层数据的抽象模型
 * 非顺序的数据结构
 * 
*/

/**
 * 二叉树
 * 最多只能有两个子节点
*/

/**
 * 二叉搜索树
 * 左边要比父节点要小，右边要比父节点大
 * 会导致一边会太别深，自平衡二叉搜索树解决（红黑树）
*/
const Compare = {
    less: -1,
    bigger: 1,
    equ: 0
}
class Node{
    constructor(key) {
        this.key = key
        this.left = null
        this.right = null
    }
}

class BST {
    constructor() {
        this.root = null
    }
    insert(key) {
        if(this.root == null) {
            this.root = new Node(key)
        } else {
            this.insertNode(this.root, key)
        }
    }
    compareFn(a, b) {
        if(a === b) {
            return Compare.equ
        }
        return a<b? Compare.less : Compare.bigger
    }
    insertNode(node, key) {
        if(this.compareFn(key, node.key) === Compare.less) {
            if(node.left == null) {
                node.left = new Node(key)
            } else {
                this.insertNode(node.left, key)
            }
            
        } else {
            if(node.right == null) {
                node.right = new Node(key)
            } else {
                this.insertNode(node.right, key)
            }

        }
    }
    // 中序遍历
    inOrderMap(callback) {
        this.inOrderMapNode(this.root, callback)
    }
    inOrderMapNode(node, callback) {
        if(node != null) {
            this.inOrderMapNode(node.left, callback)
            callback(node.key)
            this.inOrderMapNode(node.right, callback)
        }
    }
    //先序遍历
    preOrderMap(callback) {
        this.preOrderMapNode(this.root, callback)
    }
    preOrderMapNode(node, callback) {
        if(node != null) {
            callback(node.key)
            this.preOrderMapNode(node.left, callback)
            this.preOrderMapNode(node.right, callback)
        }
    }
    //后序遍历
    endOrderMap(callback) {
        this.endOrderMapNode(this.root, callback)
    }
    endOrderMapNode(node, callback) {
        if(node != null) {
            this.endOrderMapNode(node.left, callback)
            this.endOrderMapNode(node.right, callback)
            callback(node.key)
        }
    }
    //查最小值
    min() {
        return this.minNode(this.root)
    }
    minNode(node) {
        let current = node
        while(current != null && current.left!=null) {
            current = current.left
        }
        return current;
    }
    max() {
        return this.maxNode(this.root)
    }
    maxNode(node) {
        let current = node
        while(current!=null &&current.right!=null) {
            current = current.right
        }
        return current
    }
    search(key) {
        return this.searchNode(this.root, key)
    }
    searchNode(node, key) {
        if(node === null) {
            return false;
        }
        if(this.compareFn(key, node.key) === Compare.less) {
            return this.searchNode(node.left, key)
        } else if(this.compareFn(key, node.key) === Compare.bigger){
            return this.searchNode(node.right, key)
        } else {
            return true
        }
    }
    // 删除
    remove(key) {
        this.removeNode(this.root, key)
    }
    removeNode(node, key) {
        if(node ==null) {
            return null
        }
        if(this.compareFn(key, node.key) === Compare.less) {
            node.left = this.removeNode(node.left, key)
            return node
        } else if(this.compareFn(key, node.key) === Compare.bigger) {
            node.right = this.removeNode(node.right, key)
            return node
        } else {
            if(node.left == null && node.right ==null) {
                node = null
                return node
            }
            if(node.left == null) {
                node = node.right
                return node
            } else if(node.right == null) {
                node = node.left
                return node
            }

            //找到最小的
            const target = this.minNode(node.right)
            node.key = target.key
            node.right = this.removeNode(node.right, target.key)
            return node
        }
    }

}
const mytree = new BST()
mytree.insert(100)
mytree.insert(80)
mytree.insert(70)
mytree.insert(90)
mytree.insert(110)
// mytree.inOrderMap((value)=>{
//     console.log('中序',value)
// })
// mytree.preOrderMap((value)=>{
//     console.log('先序',value)
// })
// mytree.endOrderMap((value)=>{
//     console.log('后序',value)
// })
console.log(mytree.min())
console.log(mytree.max())
console.log(mytree);

