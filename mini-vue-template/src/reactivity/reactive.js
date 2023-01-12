import { track, trigger, activeEffect } from "./effect";
/**
 * @title 将params对象变成响应式
 * @param {*} params
 * @returns
 */
export function reactive(params) {
  const proxyObj = new Proxy(params, {
    get(target, property, receiver) {
      const result = Reflect.get(target, property, receiver);
      //收集target属性，建立 target 、property 和 activeEffect之间的关系
      track(target, property);
      return result;
    },
    set(target, propKey, value, receiver) {
      const result = Reflect.set(target, propKey, value, receiver);
      //触发target属性
      trigger(target, propKey);
      list.forEach((fn) => fn());
      return result;
    },
    deleteProperty(target, property) {
      const result = Reflect.deleteProperty(target, property);
      return result;
    },
  });
  return proxyObj;
}
