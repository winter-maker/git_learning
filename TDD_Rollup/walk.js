/**
 * visit 访问者；遍历器
 * @param {*} node //当前节点
 * @param {*} parent  //父节点
 * @param {*} enter     //进入节点时的回调函数
 * @param {*} leave     //离开节点时的回调函数
 * @returns 
 */
function visit(node, parent, enter, leave) {
    enter(node)
    leave(node)
    return '1'
}
module.exports = visit