import { compile } from "../compiler";
import { createAppAPI } from "./createAppAPI";
import { createVnode as _c, createTextVnode as _v } from "./vnode";

export const Text = Symbol("text");

export function createRenderer(options) {
  const {
    createElement,
    setElementText,
    createText,
    setText,
    insert,
    patchProp,
  } = options;

  const patch = (vnode, container) => {
    const { tag } = vnode;
    if (typeof tag === "string") {
      // vnode存在，挂载或更新
      mountElement(vnode, container);
    } else if (tag === Text) {
      // 挂载文本
      const el = (vnode.el = createText(vnode.children));
      // container.appendChild(el);
      insert(el, container);
    } else if (typeof tag === "object") {
      // 挂载组件
      mountComponent(vnode, container);
    }
  };

  // 负责渲染组件内容
  const render = (vnode, container) => {
    if (vnode) {
      patch(vnode, container);
    } else {
      // vnode不存在，卸载，暂时这么处理
      container.innerHTML = "";
    }
    // 存储vnode，用于下次更新作为oldvnode
    container._vnode = vnode;
  };

  // 创建元素
  const mountElement = (vnode, container) => {
    // 根据节点类型创建节点
    const el = (vnode.el = createElement(vnode.tag));

    const { props } = vnode;
    if (props) {
      for (const key in props) {
        const val = props[key];
        patchProp(el, key, null, val);

        // if (/^on/.test(key)) {
        //   // 事件
        //   const event = key.slice(2).toLowerCase();
        //   el.addEventListener(event, val);
        // } else {
        //   el.setAttribute(key, val);
        // }
      }
    }

    // children为文本
    if (typeof vnode.children === "string") {
      // el.textContent = vnode.children;
      setElementText(el, vnode.children);
    } else {
      // children为数组，递归暂时调用mountElement，后续需调整
      vnode.children.forEach((child) => patch(child, el));
    }

    // 插入元素
    // container.appendChild(el);
    insert(el, container);
  };

  const mountComponent = (vnode, container) => {
    // tag是组件配置选项
    const options = vnode.tag;

    // 如果render不存在，则需要通过编译template选项获取
    if (!options.render) {
      options.render = compile(options.template).render;
    }

    // 设置渲染函数需要的工具方法
    const ctx = { _c, _v };
    if (options.data) {
      Object.assign(ctx, options.data());
    }

    // 执行render获取组件vnode子树
    const subtree = options.render.call(ctx);
    // 向下递归
    patch(subtree, container);
  };

  return { render };
}
