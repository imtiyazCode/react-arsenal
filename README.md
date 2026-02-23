# React Arsenal ⚔️

A collection of React UI components built from scratch to understand how they work, not just how to install them.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** for bundling
- **Framer Motion** for animations
- **focus-trap-react** for accessibility

---

## Components

### Modal
- React Portals (renders to `#modal-root` in `index.html`)
- Focus trap (keyboard focus stays inside the modal)
- ESC to close, click-outside to close
- Framer Motion scale + fade animations
- Scroll-lock on open, scrollable content inside

```tsx
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <p>Your content here</p>
</Modal>
```

### Skeleton
- Shimmer animation (pure CSS, no extra deps)
- Variants: `text`, `circular`, `rectangular`, `card`
- Props: `width`, `height`, `borderRadius`, `className`
- Dark & light mode ready

```tsx
<Skeleton variant="circular" width={48} height={48} />
<Skeleton variant="text" width="60%" />
<Skeleton variant="rectangular" height={160} />
```

---

## Getting Started

```bash
yarn install
yarn dev      # dev server
yarn build    # type-check + build
```

---

## Roadmap

- [x] Modal
- [x] Skeleton Loader
- [ ] Toast System
- [ ] Infinite Scroll
- [ ] Command Palette
