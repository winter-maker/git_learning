/**
 * @title 构造作用域
 */
class scope {
  constructor(options = {}) {
    this.parent = options.parent; // 父作用域
    this.depth = this.parent ? this.parent.depth + 1 : 0; //作用域层级
    this.names = options.names || []; //作用域内的变量
    this.isBlockScope = !!options.block; // 是否块作用域
  }
  /**
   * @title 将变量添加到作用域
   * @param {string} name
   * @param {Boolen} isBlockDeclaration
   */
  add(name, isBlockDeclaration) {
    if (!isBlockDeclaration && this.isBlockScope) {
      this.parent.add(name, isBlockDeclaration);
    } else {
      this.names.push(name);
    }
  }
  /**
   * @title 判断变量是否被声明
   * @param {string} name
   * @return {Boolen}返回真假
   */
  contains(name) {
    return !!this.findDefiningScope(name);
  }
  /**
   * @title 判断变量是否被声明
   * @param {*} name
   * @returns {Object} 返回变量所在作用域
   */
  findDefiningScope(name) {
    if (this.names.includes(name)) {
      return this;
    }
    if (this.parent) {
      return this.parent.findDefiningScope(name);
    }
    return null;
  }
}
module.exports = scope;
