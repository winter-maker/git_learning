import { track, trigger } from "./effect";
export function reactive(params) {
  const proxyObj = new Proxy(params, {
    get(target, property, receiver) {
      const result = Reflect.get(target, property, receiver);
      //收集target属性
      track(target, property);
      return result;
    },
    set(target, property, receiver) {
      const result = Reflect.set(target, property, receiver);
      trigger(target, property);
      return result;
    },
    deleteProperty(target, property) {
      const result = Reflect.deleteProperty(target, property);
      return result;
    },
  });
  return proxyObj;
}
