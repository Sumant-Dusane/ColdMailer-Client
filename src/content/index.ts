import ReactDOM from "react-dom/client";
import QuickCompose, { QuickComposeModal } from "./quick_compose";
import React from "react";

function injectQuickComposeButton(composeBox: Element): void {
  if (composeBox.querySelector(".quick-compose-container")) return;

  const toolbar = composeBox.querySelector('[aria-label="Formatting options"]');
  if (!toolbar) return;

  const buttonContainer = document.createElement("td");
  buttonContainer.className = "quick-compose-container";

  toolbar?.parentElement?.parentElement?.appendChild(buttonContainer);

  const root = ReactDOM.createRoot(buttonContainer);
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
