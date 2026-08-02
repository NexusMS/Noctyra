/**
 * Noctyra — Animations Module
 * Scroll-triggered reveal animations using Intersection Observer.
 */

const SELECTORS = {
  animated: "[data-animate], .reveal",
};

const OBSERVER_OPTIONS = {
  root: null,
  rootMargin: "0px 0px -10% 0px",
  threshold: 0.1,
};

/**
 * Adds the visible class to elements entering the viewport.
 * Respects prefers-reduced-motion by revealing all elements immediately.
 * @param {IntersectionObserverEntry[]} entries
 * @param {IntersectionObserver} observer
 */
function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}

/**
 * Initializes scroll-triggered animations on elements with [data-animate].
 */
export function initAnimations() {
  const elements = document.querySelectorAll(SELECTORS.animated);

  if (elements.length === 0) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(handleIntersection, OBSERVER_OPTIONS);
  elements.forEach((el) => observer.observe(el));
}