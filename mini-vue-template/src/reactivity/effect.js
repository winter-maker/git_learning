export let activeEffect = null;

const effectStack = [];

export function effect(fn, options) {
  const effectFn = () => {
    activeEffect = effectFn;
    effectStack.push(effectFn);
    fn();
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1];
  };
  effectFn.options = options;
  effectFn();
}
const targetMap = new WeakMap();
/**
 * 建立target 与 key 之间的关系
 */
export function track(obj, key) {
  // 获取map，查看有没有
  let depsmap = targetMap.get(obj);
  if (!depsmap) {
    depsmap = new Map();
    targetMap.set(obj, depsmap);
  }
  // set
  let deps = depsmap.get(key);
  if (!deps) {
    deps = new Set();
    depsmap.set(key, deps);
  }
  deps.add(activeEffect);
}
export function trigger(target, key) {
  if (targetMap.has(target)) {
    const deps = targetMap.get(target).get(key);
    if (deps) {
      deps.forEach((effectFn) => {
        if (effectFn.options && effectFn.options.scheduler) {
          effectFn.options.scheduler(effectFn);
        } else {
          effectFn();
        }
      });
    }
  }
}
