import { addEvent } from "./eventManager";

export function createElement(vNode) {
  if (
    typeof vNode === "boolean" ||
    typeof vNode === "undefined" ||
    vNode === null
  ) {
    return new Text("");
  }

  if (typeof vNode === "number" || typeof vNode === "string") {
    return new Text(String(vNode));
  }

  if (Array.isArray(vNode)) {
    const fragment = new DocumentFragment();

    vNode.forEach((node) => fragment.append(createElement(node)));

    return fragment;
  }

  if (!Array.isArray(vNode) && typeof vNode === "object") {
    const container = document.createElement(vNode.type);

    Object.entries(vNode?.props ?? []).forEach(([attr, value]) => {
      container.setAttribute(attr, value);
    });

    container.textContent = vNode.children?.join("");

    return container;
  }
}

function updateAttributes($el, props) {}