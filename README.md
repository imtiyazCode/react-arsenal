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

### Dark Mode Toggler
- Animated pill toggle with sliding thumb + Sun/Moon SVG icons
- Three sizes: `sm` (44 px), `md` (56 px — default), `lg` (72 px)
- `useDarkMode` hook — bootstraps from `localStorage`, falls back to `prefers-color-scheme`
- Syncs `data-theme="dark"` on `<html>` for global CSS-variable theming
- Fully accessible: `role="switch"`, `aria-checked`, `:focus-visible` ring

```tsx
import { DarkModeToggler, useDarkMode } from './components/dark-mode-toggler';

const [isDark, setIsDark] = useDarkMode();

<DarkModeToggler isDark={isDark} onChange={setIsDark} size="md" />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `isDark` | `boolean` | — | Controlled state |
| `onChange` | `(val: boolean) => void` | — | Called on toggle |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Visual size |
| `label` | `string` | `"Toggle dark mode"` | `aria-label` |
| `className` | `string` | `""` | Extra CSS classes |

### Infinite Scroll
- Zero dependencies — uses the native **IntersectionObserver** API
- Sentinel element auto-unregistered while fetching (no double-fires)
- Fully composable: bring your own loader and end message
- `useIntersectionObserver` hook exported for standalone use

```tsx
import { InfiniteScroll } from './components/infinite-scroll';

<InfiniteScroll
  onLoadMore={loadNextPage}
  hasMore={hasMore}
  isLoading={isLoading}
>
  {items.map(item => <Card key={item.id} {...item} />)}
</InfiniteScroll>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `onLoadMore` | `() => void` | — | Fired when sentinel enters viewport |
| `hasMore` | `boolean` | — | Stop observing when `false` |
| `isLoading` | `boolean` | `false` | Block re-trigger while fetching |
| `loader` | `ReactNode` | built-in spinner | Custom loading indicator |
| `endMessage` | `ReactNode` | `"You're all caught up!"` | Shown when `hasMore = false` |
| `threshold` | `number` | `0.1` | IntersectionObserver threshold |
| `rootMargin` | `string` | `"0px"` | IntersectionObserver rootMargin |
| `className` | `string` | `""` | Extra class on the wrapper |

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
- [x] Dark Mode Toggler
- [x] Infinite Scroll
- [ ] Command Palette
