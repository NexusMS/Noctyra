/**
 * Noctyra — Application Entry Point
 * Initializes all modules when the DOM is ready.
 */

import { initNavbar } from "./navbar.js";
import { initAnimations } from "./animations.js";
import { initLoading } from "./loading.js";

/**
 * Sets the copyright year in the footer dynamically.
 */
function setDynamicYear() {
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

/**
 * Bootstraps the application by initializing all feature modules.
 */
function initApp() {
  initLoading();
  initNavbar();
  initAnimations();
  setDynamicYear();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}

const aboutCard = document.querySelector(".about__card");

if (aboutCard) {
    aboutCard.addEventListener("mousemove", (e) => {
        const rect = aboutCard.getBoundingClientRect();

        aboutCard.style.setProperty("--x", `${e.clientX - rect.left}px`);
        aboutCard.style.setProperty("--y", `${e.clientY - rect.top}px`);
    });
}

const faqItems = document.querySelectorAll(".faq__item");

/**
 * FAQ ITEMS for smoothly opening/closing
 */

faqItems.forEach((item) => {
  const button = item.querySelector(".faq__question");
  const answer = item.querySelector(".faq__answer");

  button.addEventListener("click", () => {
    const open = item.classList.contains("active");

    faqItems.forEach((faq) => {
      faq.classList.remove("active");
      faq.querySelector(".faq__answer").style.maxHeight = null;
      faq.querySelector(".faq__question").setAttribute("aria-expanded", "false");
    });

    if (!open) {
      item.classList.add("active");
      answer.style.maxHeight = answer.scrollHeight + "px";
      button.setAttribute("aria-expanded", "true");
    }
  });
});