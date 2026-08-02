/**
 * Noctyra — Loading Module
 * Manages the initial page load screen and fade-out transition.
 */

const SELECTORS = {
  loader: "[data-loader]",
};

const MIN_DISPLAY_MS = 600;

/**
 * Hides the loading screen with a fade-out transition.
 * @param {HTMLElement} loader
 */
function hideLoader(loader) {
  loader.classList.add("is-hidden");
  loader.setAttribute("aria-hidden", "true");

  loader.addEventListener(
    "transitionend",
    () => {
      loader.remove();
    },
    { once: true }
  );
}

/**
 * Initializes the loading screen and removes it once the page is ready.
 */
export function initLoading() {
  const loader = document.querySelector(SELECTORS.loader);

  if (!loader) return;

  const startTime = Date.now();

  const onReady = () => {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);

    setTimeout(() => hideLoader(loader), remaining);
  };

  if (document.readyState === "complete") {
    onReady();
  } else {
    window.addEventListener("load", onReady, { once: true });
  }
}
