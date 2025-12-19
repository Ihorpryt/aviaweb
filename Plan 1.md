1. Inspect where the dark-mode button lives and how navigation is composed (Nav component, button/link structure).
2. Identify the current Tailwind dark-mode setup (e.g., `dark` class strategy, CSS variables) and where the root `dark` class should be applied.
3. Add a small theme toggle handler that flips the `dark` class on `document.documentElement` and persists the choice (e.g., `localStorage`).
4. Wire the handler to the nav button and ensure it is a real button (not a `Link`) with an accessible label.
5. Verify dark/light styles switch correctly and decide whether to initialize from stored preference or system preference.
