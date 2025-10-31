# M&S Animations & Styles - Quick Reference

Complete guide to using the M&S animation library in your website.

## 📦 Installation

Add this to your HTML `<head>`:

```html
<link rel="stylesheet" href="ms-animations-styles.css">
```

---

## 🎨 Basic Animations

### Fade & Slide Animations

| Class | Effect | Duration |
|-------|--------|----------|
| `.fade-in` | Fades in from bottom with slight upward movement | 0.5s |
| `.slide-in` | Slides in from left to right | 0.5s |
| `.nav-item-animate-in` | Smooth slide from far left with bounce | 0.4s |
| `.nav-item-exit-left` | Quick exit to the left | 0.15s |

**Example:**
```html
<div class="fade-in">This will fade in when loaded</div>
<button class="slide-in">This will slide in</button>
```

---

## ✨ Hover Effects

### Lift & Glow Effects

| Class | Effect |
|-------|--------|
| `.ms-hover-lift` | Lifts element up on hover with shadow |
| `.ms-hover-glow` | Adds glowing shadow on hover |
| `.ms-card-hover` | Lifts card with green glow border |
| `.ms-text-hover-glow` | Text glows on hover |

**Example:**
```html
<div class="ms-hover-lift">Hover me to lift</div>
<div class="ms-card-hover">Card with hover effect</div>
```

---

## 🔄 Continuous Animations

### Always Active Animations

| Class | Effect |
|-------|--------|
| `.ms-animate-pulse` | Continuously pulses (scale effect) |
| `.ms-animate-glow` | Continuously glows (text shadow) |
| `.ms-animate-sparkle` | Sparkle effect with brightness change |

**Example:**
```html
<div class="ms-animate-pulse">I'm pulsing!</div>
<span class="ms-animate-glow">Glowing text</span>
```

---

## 🎯 Button Hover Effects

### Button Classes

| Class | Effect |
|-------|--------|
| `.ms-btn-hover-primary` | Green glow and lift on hover |
| `.ms-btn-hover-secondary` | Border color change with glow |

**Example:**
```html
<button class="ms-btn-hover-primary">Primary Button</button>
<button class="ms-btn-hover-secondary">Secondary Button</button>
```

---

## ⏳ Loading Indicators

### Loading Dots

```html
<div class="ms-loading-dots">
    <span></span>
    <span></span>
    <span></span>
</div>
```

Creates animated bouncing dots - perfect for loading states!

---

## 💥 Dramatic Effects

### Explosive Animations

| Class | Effect |
|-------|--------|
| `.logout-explode-up` | Element explodes upward |
| `.logout-explode-down` | Element explodes downward |
| `.logout-explode-top-left` | Element explodes to top-left |
| `.logout-explode-top-right` | Element explodes to top-right |
| `.logout-explode-bottom-left` | Element explodes to bottom-left |
| `.logout-explode-bottom-right` | Element explodes to bottom-right |

### Other Dramatic Effects

| Class | Effect |
|-------|--------|
| `.logout-selected-vanish` | Element vanishes with rotation and blur |
| `.logout-praxis-zoom` | Dramatic zoom out with color change |
| `.logout-chat-slide` | Slides away with rotation |
| `.logout-control-fly` | Flies away diagonally |
| `.nav-item-dramatic-entrance` | Dramatic slide in from far left |
| `.nav-item-dramatic-exit` | Dramatic slide out to left |

**Example:**
```html
<div class="logout-explode-up">Click me to explode!</div>
<div class="logout-selected-vanish">Vanish on click</div>
```

---

## 🎨 CSS Variables

### Colors

```css
--ms-bg-primary: #0f0f0f;          /* Main background */
--ms-bg-secondary: #1a1a1a;        /* Secondary background */
--ms-accent-primary: #16a34a;      /* Green accent */
--ms-accent-light: #22c55e;        /* Light green */
--ms-text-primary: #ffffff;        /* White text */
--ms-text-secondary: #a0a0a0;      /* Gray text */
--ms-text-tertiary: #808080;       /* Darker gray */
--ms-text-muted: #4a5568;          /* Muted text */
```

### Status Colors

```css
--ms-success: #22c55e;   /* Green */
--ms-warning: #fbbf24;   /* Yellow */
--ms-danger: #ef4444;    /* Red */
--ms-info: #38bdf8;      /* Blue */
```

### Typography

```css
--ms-font-primary: 'Inter', sans-serif;
--ms-font-mono: 'JetBrains Mono', monospace;

/* Font Sizes */
--ms-text-xs: 0.6rem;
--ms-text-sm: 0.7rem;
--ms-text-base: 0.85rem;
--ms-text-md: 0.9rem;
--ms-text-lg: 1.2rem;
--ms-text-xl: 1.5rem;
--ms-text-2xl: 2rem;
--ms-text-3xl: 3rem;
```

### Transitions

```css
--ms-transition-fast: 0.15s ease;
--ms-transition-base: 0.3s ease;
--ms-transition-slow: 0.5s ease;
```

### Shadows

```css
--ms-shadow-sm: 0 0 5px rgba(0, 0, 0, 0.2);
--ms-shadow-md: 0 0 15px rgba(22, 163, 74, 0.2);
--ms-shadow-lg: 0 0 20px rgba(22, 163, 74, 0.3);
--ms-shadow-glow: 0 0 15px rgba(22, 163, 74, 0.6);
```

**Example Usage:**
```css
.my-element {
    background: var(--ms-bg-primary);
    color: var(--ms-accent-primary);
    transition: all var(--ms-transition-base);
    box-shadow: var(--ms-shadow-glow);
}
```

---

## 🎬 JavaScript Control

### Restart Animation

```javascript
function resetAnimation(elementId, className) {
    const element = document.getElementById(elementId);
    element.classList.remove(className);
    void element.offsetWidth; // Force reflow
    element.classList.add(className);
}

// Usage
resetAnimation('myElement', 'fade-in');
```

### Toggle Animation

```javascript
function toggleAnimation(elementId, className) {
    const element = document.getElementById(elementId);
    element.classList.toggle(className);
}

// Usage
toggleAnimation('myElement', 'ms-animate-pulse');
```

### Trigger on Event

```javascript
document.getElementById('myButton').addEventListener('click', function() {
    this.classList.add('logout-explode-up');
});
```

---

## 📱 Responsive Behavior

All animations automatically adjust for mobile devices:
- Faster animations on smaller screens
- Respects `prefers-reduced-motion` for accessibility
- Reduced complexity for better performance

---

## 🎯 Common Patterns

### Card with Hover Effect

```html
<div class="ms-card-hover" style="
    background: var(--ms-bg-card);
    border: 1px solid var(--ms-border-default);
    border-radius: 8px;
    padding: 24px;
">
    <h3 style="color: var(--ms-accent-primary);">Card Title</h3>
    <p style="color: var(--ms-text-secondary);">Card content here</p>
</div>
```

### Button with Hover

```html
<button class="ms-btn-hover-primary" style="
    background: var(--ms-accent-primary);
    color: var(--ms-text-primary);
    padding: 12px 24px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 0.05em;
">
    Click Me
</button>
```

### Animated List Items

```html
<nav>
    <div class="nav-item-animate-in" style="animation-delay: 0.1s;">Item 1</div>
    <div class="nav-item-animate-in" style="animation-delay: 0.2s;">Item 2</div>
    <div class="nav-item-animate-in" style="animation-delay: 0.3s;">Item 3</div>
</nav>
```

### Loading State

```html
<div style="display: flex; align-items: center; gap: 10px;">
    <span style="color: var(--ms-text-secondary);">Loading</span>
    <div class="ms-loading-dots">
        <span></span>
        <span></span>
        <span></span>
    </div>
</div>
```

---

## 🎨 Customization

### Override Animation Duration

```css
.my-custom-fade {
    animation: fadeIn 1s ease-out forwards; /* Slower fade */
}
```

### Chain Animations

```css
.my-element {
    animation: fadeIn 0.5s ease-out forwards,
               pulse 2s ease-in-out infinite 0.5s; /* Start pulse after fade */
}
```

### Custom Colors

```css
:root {
    --ms-accent-primary: #3b82f6; /* Change to blue */
    --ms-accent-light: #60a5fa;
}
```

---

## 🔧 Advanced Usage

### Create Staggered Animations

```javascript
const items = document.querySelectorAll('.stagger-item');
items.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.classList.add('fade-in');
});
```

### Sequence Multiple Effects

```javascript
async function sequenceEffects(element) {
    element.classList.add('fade-in');
    await delay(500);
    element.classList.add('ms-animate-pulse');
    await delay(2000);
    element.classList.add('logout-explode-up');
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
```

### On Scroll Animations

```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
});

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});
```

---

## ♿ Accessibility

The library automatically respects user preferences:

```css
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}
```

Users who prefer reduced motion will see instant transitions instead of animations.

---

## 📝 Notes

- All animations use hardware-accelerated CSS properties (transform, opacity) for smooth performance
- Animations are optimized for 60fps
- Mobile devices get lighter animations automatically
- All colors and timing can be customized via CSS variables
- Works with all modern browsers (Chrome, Firefox, Safari, Edge)

---

## 🎉 Examples

Check out `animations-demo.html` for live examples of all animations!

```bash
# Open the demo file in your browser
open animations-demo.html
```

---

## 📚 Additional Resources

- **Template**: `template.html` - Complete page template with all styles
- **Demo**: `animations-demo.html` - Interactive animation showcase
- **Styles**: `ms-animations-styles.css` - Complete stylesheet
- **Variables**: All CSS variables included in the main stylesheet

---

**Happy Animating! 🚀**

*M&S Design System - Created for modern, minimalist web experiences*

