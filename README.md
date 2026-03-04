# ⚡ startup-hooks

> A lean collection of production-ready React custom hooks. Copy-paste or install — no dependencies, fully typed JSDoc, SSR-safe.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/react-%3E%3D16.8-61DAFB.svg)](https://reactjs.org/)

---

## Hooks

| Hook | Description |
|---|---|
| [`useWindowSize`](#usewindowsize) | Reactive window dimensions |
| [`useLocalStorage`](#uselocalstorage) | State synced to localStorage |
| [`useScroll`](#usescroll) | Scroll position + direction |
| [`useForm`](#useform) | Form state + validation |
| [`useDebounce`](#usedebounce) | Debounce any value |

---

## Installation

```bash
# Copy individual files into your project, or install the package:
npm install startup-hooks
```

All hooks are also available as standalone files — just copy the one you need from `src/hooks/`.

---

## Usage

```js
import { useWindowSize, useLocalStorage, useScroll, useForm, useDebounce } from 'startup-hooks';
```

---

## `useWindowSize`

Returns the current browser window dimensions. Updates automatically on resize. SSR-safe.

```jsx
import { useWindowSize } from 'startup-hooks';

function Layout() {
  const { width, height } = useWindowSize();

  return (
    <p>Window: {width} × {height}px</p>
  );
}
```

**Returns:** `{ width: number, height: number }`

---

## `useLocalStorage`

Drop-in replacement for `useState` that persists to `localStorage`. Handles JSON serialization automatically.

```jsx
import { useLocalStorage } from 'startup-hooks';

function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');

  return (
    <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
      Current: {theme}
    </button>
  );
}
```

**Params:** `key: string`, `initialValue: any`  
**Returns:** `[storedValue, setValue]`

---

## `useScroll`

Tracks scroll position, direction, and edge states. Uses a passive listener — no performance impact.

```jsx
import { useScroll } from 'startup-hooks';

function Navbar() {
  const { y, direction } = useScroll();
  const visible = direction !== 'down' || y < 80;

  return (
    <nav style={{ transform: visible ? 'translateY(0)' : 'translateY(-100%)' }}>
      My Nav
    </nav>
  );
}
```

**Returns:** `{ x, y, direction: 'up' | 'down' | null, isAtTop: boolean, isAtBottom: boolean }`

---

## `useForm`

Manages form values, validation errors, touched state, and async submission — no external library needed.

```jsx
import { useForm } from 'startup-hooks';

function LoginForm() {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = useForm(
    { email: '', password: '' },
    (vals) => {
      const errs = {};
      if (!vals.email.includes('@')) errs.email = 'Invalid email';
      if (vals.password.length < 6) errs.password = 'Min 6 characters';
      return errs;
    }
  );

  const onSubmit = handleSubmit(async (data) => {
    await api.login(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <input name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
      {touched.email && errors.email && <span>{errors.email}</span>}

      <input name="password" type="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
      {touched.password && errors.password && <span>{errors.password}</span>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

**Params:** `initialValues: object`, `validate?: (values) => errors`  
**Returns:** `{ values, errors, touched, handleChange, handleBlur, handleSubmit, reset, isSubmitting }`

---

## `useDebounce`

Delays propagating a value until after a quiet period. Ideal for search inputs and API calls.

```jsx
import { useState, useEffect } from 'react';
import { useDebounce } from 'startup-hooks';

function Search() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    if (debouncedQuery) fetchResults(debouncedQuery);
  }, [debouncedQuery]);

  return <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search..." />;
}
```

**Params:** `value: any`, `delay?: number` (default: `500`)  
**Returns:** debounced value

---

## Design Principles

- **Zero dependencies** — only peer dep is React ≥ 16.8
- **SSR-safe** — all hooks guard against `window`/`document` access during server rendering
- **Copy-paste friendly** — each hook is a single self-contained file
- **JSDoc typed** — full IntelliSense without TypeScript overhead

---

## Contributing

PRs welcome! If you have a hook you find yourself rewriting on every project, open an issue or submit a pull request.

---

## License

MIT © startup-hooks contributors
