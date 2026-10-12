# Server-rendered markup

Hydration is out of scope. Server-rendered **light-DOM markup** (what you would write by hand) upgrades normally once `ui.js` loads.

- Render only the public tag and its documented children, never the internal DOM a component generates.
- Use the FOUC rules to hide not-yet-upgraded complex elements.
- Keep a native fallback for forms where practical.
