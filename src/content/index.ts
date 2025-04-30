import ReactDOM from "react-dom/client";
import QuickCompose, { QuickComposeModal } from "./quick_compose";
import React from "react";
import mainCSS from "@/index.css?inline";

function injectQuickComposeButton(composeBox: Element): void {
  if (composeBox.querySelector(".quick-compose-container")) return;

  const toolbar = composeBox.querySelector('[aria-label="Formatting options"]');
  if (!toolbar) return;

  const wrapper = document.createElement("div");
  wrapper.className = "quick-compose-container";

  const shadowHost = document.createElement("div");
  const shadow = shadowHost.attachShadow({ mode: "open" });

  shadow.adoptedStyleSheets = [];

  if ("adoptedStyleSheets" in Document.prototype) {
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(mainCSS);
    shadow.adoptedStyleSheets.push(styleSheet);
  } else {
    const styleEl = document.createElement("style");
    styleEl.textContent = mainCSS;
    shadow.appendChild(styleEl);
  }

  wrapper.appendChild(shadowHost);
  toolbar.parentElement?.parentElement?.appendChild(wrapper);

  // // Inject Tailwind and Shadcn styles
  // const styleLink = document.createElement("link");
  // styleLink.setAttribute("rel", "stylesheet");
  // styleLink.setAttribute(
  //   "href",
  //   chrome.runtime.getURL("assets/content_style.css")
  // );
  // shadow.appendChild(styleLink);

  // const styleEl = document.createElement("style");
  // styleEl.textContent = mainCSS;
  // shadow.appendChild(styleEl);

  // Mount React
  const mountPoint = document.createElement("div");
  shadow.appendChild(mountPoint);

  const root = ReactDOM.createRoot(mountPoint);
  root.render(
    React.createElement(QuickCompose, { onClick: openQuickComposeModal })
  );
}

function openQuickComposeModal(): void {
  const modalContainer = document.createElement("div");
  modalContainer.className = "quick-compose-modal-container";

  const root = ReactDOM.createRoot(modalContainer);
  root.render(React.createElement(QuickComposeModal));
}

function observeGmail(): void {
  const observer = new MutationObserver((_) => {
    const composeBoxes = document.querySelectorAll('div[role="dialog"]');
    composeBoxes.forEach((box) => injectQuickComposeButton(box));
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

observeGmail();
