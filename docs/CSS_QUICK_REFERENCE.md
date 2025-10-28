# CSS Quick Reference Guide

## 🎨 CSS Variables (Custom Properties)

### Colors

```css
/* Background Colors */
--main-bg: #0a0a0f;
--card-bg: rgba(255, 255, 255, 0.03);

/* Text Colors */
--text-primary: #ffffff;
--text-secondary: #b8bcc8;

/* Accent Colors */
--accent-cyan: #00d4ff;      /* Primary accent */
--accent-green: #00ff88;     /* Success/positive */
--accent-purple: #8b5cf6;    /* Secondary accent */
--accent-gold: #fbbf24;      /* Warning/highlight */

/* Utility Colors */
--border-color: rgba(255, 255, 255, 0.08);
--shadow-light: rgba(0, 0, 0, 0.3);
--shadow-dark: rgba(0, 0, 0, 0.6);
--placeholder-color: #6c7293;
```

### Typography

```css
/* Font Families */
--font-primary: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-mono: source-code-pro, Menlo, Monaco, Consolas, monospace;
```

### Spacing

```css
--spacing-xs: 0.25rem;    /* 4px  */
--spacing-sm: 0.5rem;     /* 8px  */
--spacing-md: 1rem;       /* 16px */
--spacing-lg: 1.5rem;     /* 24px */
--spacing-xl: 2rem;       /* 32px */
--spacing-2xl: 3rem;      /* 48px */
```

### Transitions

```css
--transition-fast: 0.15s ease;
--transition-base: 0.3s ease;
--transition-slow: 0.5s ease;
--transition-smooth: cubic-bezier(0.4, 0, 0.2, 1);
```

### Border Radius

```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 20px;
--radius-xl: 25px;
--radius-full: 9999px;
```

### Gradients

```css
/* Primary Gradient */
--gradient-primary: linear-gradient(
    135deg,
    var(--accent-cyan),
    var(--accent-purple),
    var(--accent-green)
);

/* Background Gradient */
--gradient-bg: /* Complex multi-layer gradient */

/* Shimmer Effect */
--shimmer: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.4) 50%,
    transparent 100%
);
```

### Z-Index Layers

```css
--z-base: 1;
--z-dropdown: 100;
--z-sticky: 200;
--z-fixed: 300;
--z-modal-backdrop: 400;
--z-modal: 500;
--z-popover: 600;
--z-tooltip: 700;
--z-notification: 1000;
```

---

## 📐 Common Patterns

### Using Variables

```css
/* Example: Button with accent color */
.my-button {
    background: var(--accent-cyan);
    color: var(--main-bg);
    padding: var(--spacing-md) var(--spacing-lg);
    border-radius: var(--radius-lg);
    transition: all var(--transition-base);
}
```

### Responsive Typography

```css
/* Fluid font sizing */
.heading {
    font-size: clamp(1.5rem, 4vw, 2rem);
}

.body-text {
    font-size: clamp(0.9rem, 2vw, 1.1rem);
}
```

### Responsive Spacing

```css
/* Fluid padding */
.container {
    padding: clamp(1rem, 4vw, 2rem);
}

/* Fluid margin */
.section {
    margin-bottom: clamp(2rem, 5vh, 4rem);
}
```

### Glassmorphism Effect

```css
.glass-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-lg);
    box-shadow: 0 8px 32px var(--shadow-light);
}
```

### Gradient Border

```css
.gradient-border {
    border: 2px solid transparent;
    background: 
        linear-gradient(var(--main-bg), var(--main-bg)) padding-box,
        var(--gradient-primary) border-box;
    border-radius: var(--radius-lg);
}
```

### Hover Effects

```css
.interactive-element {
    transition: all var(--transition-base);
    will-change: transform;
}

.interactive-element:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0, 212, 255, 0.3);
}
```

---

## ♿ Accessibility Helpers

### Focus Visible

```css
/* Add to all interactive elements */
button:focus-visible,
a:focus-visible,
input:focus-visible {
    outline: 2px solid var(--accent-cyan);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
}
```

### Screen Reader Only

```css
/* Apply to elements visible only to screen readers */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
}
```

### Reduced Motion

```css
/* Respect user motion preferences */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */

/* Base styles (0-767px) */
.element {
    font-size: 1rem;
    padding: 1rem;
}

/* Tablet (768px+) */
@media (max-width: 768px) {
    .element {
        font-size: 0.95rem;
        padding: 0.875rem;
    }
}

/* Small Phone (480px+) */
@media (max-width: 480px) {
    .element {
        font-size: 0.9rem;
        padding: 0.75rem;
    }
}
```

---

## 🎭 Animation Patterns

### Fade In

```css
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in {
    animation: fadeIn 0.5s ease-out;
}
```

### Spin (Loading)

```css
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.spinner {
    animation: spin 0.8s linear infinite;
}
```

### Pulse

```css
@keyframes pulse {
    0%, 100% {
        transform: scale(1);
        opacity: 1;
    }
    50% {
        transform: scale(1.1);
        opacity: 0.8;
    }
}

.pulse {
    animation: pulse 2s ease-in-out infinite;
}
```

### Shimmer

```css
.shimmer::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: var(--shimmer);
    transition: left 0.6s ease;
}

.shimmer:hover::before {
    left: 100%;
}
```

---

## 🎯 Common Components

### Button (Primary)

```css
.btn-primary {
    background: var(--gradient-primary);
    color: var(--main-bg);
    padding: var(--spacing-md) var(--spacing-xl);
    border: none;
    border-radius: var(--radius-lg);
    font-weight: 700;
    cursor: pointer;
    transition: all var(--transition-smooth);
}

.btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0, 212, 255, 0.4);
}

.btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
```

### Input Field

```css
.input-field {
    width: 100%;
    padding: var(--spacing-md) var(--spacing-lg);
    background: transparent;
    border: 2px solid var(--border-color);
    border-radius: var(--radius-lg);
    color: var(--text-primary);
    font-size: 1rem;
    transition: all var(--transition-base);
}

.input-field:focus {
    outline: none;
    border-color: var(--accent-cyan);
    box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.1);
}

.input-field::placeholder {
    color: var(--placeholder-color);
    opacity: 0.7;
}
```

### Card

```css
.card {
    background: var(--card-bg);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: var(--spacing-xl);
    box-shadow: 0 8px 32px var(--shadow-light);
}
```

### Badge/Tag

```css
.badge {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-md);
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: var(--radius-full);
    font-size: 0.9rem;
    font-weight: 600;
    transition: all var(--transition-base);
}

.badge:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
}
```

---

## 💡 Pro Tips

### 1. Always Use Variables for Colors
```css
/* ❌ Don't do this */
color: #ffffff;

/* ✅ Do this */
color: var(--text-primary);
```

### 2. Use clamp() for Responsive Sizing
```css
/* ❌ Don't do this */
font-size: 1.5rem;
@media (max-width: 768px) {
    font-size: 1.2rem;
}

/* ✅ Do this */
font-size: clamp(1.2rem, 3vw, 1.5rem);
```

### 3. Add Focus States to Interactive Elements
```css
/* ✅ Always include focus-visible */
button:focus-visible {
    outline: 2px solid var(--accent-cyan);
    outline-offset: 2px;
}
```

### 4. Use will-change for Animated Elements
```css
/* ✅ Hint browser about changes */
.animated-element {
    will-change: transform;
    transition: transform var(--transition-base);
}
```

### 5. Provide Fallbacks for Modern CSS
```css
/* ✅ Fallback for backdrop-filter */
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(10px);
-webkit-backdrop-filter: blur(10px);
```

---

## 🔍 Debugging Tips

### Check Variable Values
```css
/* Temporarily add to see variable value */
.debug {
    border: 2px solid red;
    background: var(--spacing-md); /* Will show if variable exists */
}
```

### Visualize Spacing
```css
/* Temporarily add to all elements */
* {
    outline: 1px solid red;
}
```

### Check Z-Index Issues
```css
/* Temporarily add to see stacking context */
.debug-z {
    position: relative;
    z-index: 9999;
    background: rgba(255, 0, 0, 0.5);
}
```

---

## 📚 Additional Resources

- **Full Documentation**: See `CSS_IMPROVEMENTS.md`
- **Project Variables**: See `index.css` `:root` section
- **Component Styles**: See individual component CSS files

---

**Quick Start**: Copy the patterns above and replace placeholder class names with your own. Always use CSS variables for consistency!