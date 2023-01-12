export let activeEffect = null;

// 当函数嵌套执行时，把函数保存到栈中
let effectStack = [];
/**
 * @title 副作用函数
 * @param {*} fn
 * @param {*} options
 */
export function effect(fn, options) {
  const effectFn = () => {
    activeEffect = effectFn;
    // 把当前执行的函数放入栈中，嵌套执行时会形成队列，最后一个就是正在执行的函数
    effectStack.push(effectFn);
    //函数执行完毕
    fn();
    //把执行完毕的函数剔出出来
    effectStack.pop();
    //把最后一个函数赋值到正要执行的函数
    activeEffect = effectStack[effectStack.length - 1];
  };
  effectFn.options = options;
  effectFn();
}
const targetMap = new WeakMap();
/**
 * 跟踪函数
 * 建立target 与 property 之间的关系
 * 收集target属性，建立 target 、property 和 activeEffect之间的关系
 */
export function track(target, property) {
  // 实现数据结构 {target: {property: [activeEffect]}}
  // target是WeakMap类型，property 是map类型，activeEffect是set类型
  // 从WeakMap中查看有没有target,没有就set target,
  let depsmap = targetMap.get(target);
  if (!depsmap) {
    // target的值是个map类型
    depsmap = new Map();
    targetMap.set(target, depsmap);
  }
  // 查看 target值中有没有 property 属性
  // 没有就创建set，并且把activeEffect添加到set中去。
  let deps = depsmap.get(property);
  if (!deps) {
    deps = new Set();
    depsmap.set(property, deps);
  }
  deps.add(activeEffect);
}
export function trigger(target, property) {
  if (targetMap.has(target)) {
    const deps = targetMap.get(target).get(property);
    if (deps) {
      deps.forEach((effectFn) => {
        //console.log(effectFn);
        if (effectFn) {
          //如果有任务调度，就异步执行
          if (effectFn.options && effectFn.options.scheduler) {
            effectFn.options.scheduler(effectFn);
          } else {
            effectFn();
          }
        }
      });
    }
  }
}
