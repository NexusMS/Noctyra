/**
 * Noctyra — Navigation Module
 * Handles desktop navigation state and mobile menu toggle.
 */

const SELECTORS = {
  toggle: "[data-nav-toggle]",
  mobileNav: "[data-nav-mobile]",
  mobileLinks: "[data-nav-mobile] .nav-mobile__link",
  navLinks: ".nav__link",
  header: "[data-header]",
};

const SCROLL_THRESHOLD = 20;

/**
 * Sets the active state on navigation links matching the current page.
 */
function setActiveNavLink() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const allLinks = document.querySelectorAll(`${SELECTORS.navLinks}, ${SELECTORS.mobileLinks}`);

  allLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    const linkPath = href.split("/").pop();
    const isActive = linkPath === currentPath || (currentPath === "" && linkPath === "index.html");

    link.classList.toggle("is-active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

/**
 * Opens or closes the mobile navigation drawer.
 * @param {HTMLElement} toggle - The menu toggle button
 * @param {HTMLElement} mobileNav - The mobile nav container
 * @param {boolean} isOpen - Whether the menu should be open
 */
function setMobileNavState(toggle, mobileNav, isOpen) {
  toggle.setAttribute("aria-expanded", String(isOpen));
  mobileNav.classList.toggle("is-open", isOpen);
  mobileNav.setAttribute("aria-hidden", String(!isOpen));
  document.body.style.overflow = isOpen ? "hidden" : "";
}

/**
 * Toggles glassmorphism on the header after scrolling past the threshold.
 */
function initHeaderScroll() {
  const header = document.querySelector(SELECTORS.header);

  if (!header) return;

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > SCROLL_THRESHOLD);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/**
 * Initializes navbar behavior including mobile menu and active link highlighting.
 */
export function initNavbar() {
  const toggle = document.querySelector(SELECTORS.toggle);
  const mobileNav = document.querySelector(SELECTORS.mobileNav);

  if (!toggle || !mobileNav) return;

  toggle.addEventListener("click", () => {
    const isCurrentlyOpen = toggle.getAttribute("aria-expanded") === "true";
    setMobileNavState(toggle, mobileNav, !isCurrentlyOpen);
  });

  document.querySelectorAll(SELECTORS.mobileLinks).forEach((link) => {
    link.addEventListener("click", () => {
      setMobileNavState(toggle, mobileNav, false);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setMobileNavState(toggle, mobileNav, false);
      toggle.focus();
    }
  });

  setActiveNavLink();
  initHeaderScroll();
}
