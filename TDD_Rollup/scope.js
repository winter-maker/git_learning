class Scope {
  constructor(props) {
    const { parent } = props || {};
    this.parent = parent;
    this.names = [];
  }

  add(name) {
    this.names.push(name);
  }

  contains(name) {
    return !!this.findDefiningScope(name);
  }

  findDefiningScope(name) {
    if (this.names.includes(name)) {
      return this;
    } else if (this.parent) {
      return this.parent.findDefiningScope(name);
    }
    return;
  }
}

module.exports = Scope;
