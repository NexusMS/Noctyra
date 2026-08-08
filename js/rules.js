/* ==========================================================================
   Noctyra — Rules Page Interaction
   Drives the split-panel rule selector on rules.html.
   Click / tap / keyboard always work (accessible tabs pattern).
   On devices that support real hover, moving the mouse over a rule
   also switches the panel, for a premium dashboard-style feel.
   ========================================================================== */

const selector = document.querySelector('[data-rules-selector]');

if (selector) {
  const tabs = Array.from(selector.querySelectorAll('[data-rule-tab]'));
  const panels = Array.from(selector.querySelectorAll('[data-rule-panel]'));
  const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const activate = (key) => {
    tabs.forEach((tab) => {
      const isMatch = tab.dataset.ruleTab === key;
      tab.classList.toggle('is-active', isMatch);
      tab.setAttribute('aria-selected', String(isMatch));
      tab.tabIndex = isMatch ? 0 : -1;
    });

    panels.forEach((panel) => {
      const isMatch = panel.dataset.rulePanel === key;
      if (isMatch) {
        panel.hidden = false;
        // Restart entrance animation
        panel.classList.remove('is-active');
        // Force reflow so the animation replays every time
        void panel.offsetWidth;
        panel.classList.add('is-active');
      } else {
        panel.classList.remove('is-active');
        panel.hidden = true;
      }
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => activate(tab.dataset.ruleTab));

    if (supportsHover) {
      tab.addEventListener('mouseenter', () => activate(tab.dataset.ruleTab));
    }

    tab.addEventListener('keydown', (event) => {
      const currentIndex = tabs.indexOf(tab);
      let nextIndex = null;

      if (event.key === 'ArrowDown') nextIndex = (currentIndex + 1) % tabs.length;
      if (event.key === 'ArrowUp') nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabs.length - 1;

      if (nextIndex !== null) {
        event.preventDefault();
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.ruleTab);
      }
    });
  });
}

/* ==========================================================================
   Moderation Card — Cursor-Following Glow
   Reuses the exact technique already used by the About card on index.html:
   home.css's `.about__card::before` paints a radial-gradient positioned at
   `var(--x, 50%) var(--y, 50%)` and fades in/out on hover via opacity.
   The moderation card already has the `.about__card` class, so it already
   inherits that glow — this just tracks the cursor to update --x/--y,
   scoped only to the moderation card (not the intro card or any other
   section of rules.html).
   ========================================================================== */

const moderationCard = document.querySelector('.rules-moderation__card');

if (moderationCard && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  moderationCard.addEventListener('mousemove', (event) => {
    const rect = moderationCard.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    moderationCard.style.setProperty('--x', `${x}%`);
    moderationCard.style.setProperty('--y', `${y}%`);
  });

  moderationCard.addEventListener('mouseleave', () => {
    moderationCard.style.setProperty('--x', '50%');
    moderationCard.style.setProperty('--y', '50%');
  });
}