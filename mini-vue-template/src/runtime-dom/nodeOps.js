export const nodeOps = {
  createElement(tag) {
    return document.createElement(tag);
  },
  createText(text) {
    return document.createTextNode(text);
  },
  setElementText(el, text) {
    el.textContent = text;
  },
  setText(el, text) {
    el.nodeValue = text;
  },
  insert(child, parent, anchor) {
    parent.insertBefore(child, anchor || null);
  },
  patchProp(el, key, prevValue, nextValue) {
    if (/^on/.test(key)) {
      // 事件
      const event = key.slice(2).toLowerCase();
      el.addEventListener(event, nextValue);
    } else {
      el.setAttribute(key, nextValue);
    }
  },
};
