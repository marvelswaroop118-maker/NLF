# Home modules

- `hero/`: hero component, copy, links and layout.
- `about/`: About/charter component, constitutional content and reading layout. The `/charter` route reuses this module.
- `navigation/`: navbar design system, glassmorphic elevation, explore popover, zero-jank scroll progress tracking, and accessible mobile drawer.
- `shared/`: sweep buttons, desktop section navigation and theme-aware finishing styles.
- `../theme/theme.js`: design tokens, responsive breakpoints and light/dark palettes. System preference is applied through CSS media queries and updates automatically without a reload.

Mobile pagination is hidden. About cards use native sticky positioning for scroll stacking; reduced-motion and short mobile screens use normal document flow. Content remains readable without scroll interception or animation libraries.
