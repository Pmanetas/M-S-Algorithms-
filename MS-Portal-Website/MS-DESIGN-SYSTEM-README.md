# M&S Design System

Complete design system specification for building applications that match the Manetas & Stevens aesthetic.

## 📦 Files Included

1. **`ms-design-system.json`** - Complete design tokens in JSON format (for programmatic use)
2. **`ms-variables.css`** - CSS variables and utility classes (ready to import)
3. **`template.html`** - Example HTML page demonstrating all components

## 🚀 Quick Start

### Option 1: Using CSS Variables (Recommended)

Import the CSS file into your project:

```html
<link rel="stylesheet" href="ms-variables.css">
```

Or in your CSS:

```css
@import 'ms-variables.css';
```

Then use the variables and classes:

```html
<button class="ms-btn ms-btn-primary">Click Me</button>
<div class="ms-card">
  <div class="ms-card-header">Title</div>
  <p class="ms-text-secondary">Content</p>
</div>
```

### Option 2: Using JSON (For Build Tools/Frameworks)

Read the JSON file in your build process:

```javascript
const designSystem = require('./ms-design-system.json');

// Access any design token
const primaryColor = designSystem.colors.accent.green; // #16a34a
const fontSize = designSystem.typography.fontSizes.base; // 0.85rem
```

## 🎨 Design Principles

### Colors

The system uses a **dark theme** with **green accents**:

- **Background**: `#0f0f0f` (very dark grey)
- **Primary Accent**: `#16a34a` (green)
- **Text**: White to grey scale

```css
/* Using CSS Variables */
background: var(--ms-bg-primary);
color: var(--ms-accent-primary);

/* Using Classes */
<div class="ms-bg-primary ms-text-accent">
```

### Typography

Two main fonts:
- **Inter** - UI text, general content
- **JetBrains Mono** - Code, data, technical information

```css
/* Using CSS Variables */
font-family: var(--ms-font-primary);
font-family: var(--ms-font-mono);

/* Using Classes */
<p class="ms-font-primary">Regular text</p>
<code class="ms-font-mono">Technical data</code>
```

### Spacing

Follow the **4px/8px grid system**:

```css
/* Using CSS Variables */
margin: var(--ms-space-base); /* 16px */
padding: var(--ms-space-lg); /* 20px */

/* Using Classes */
<div class="ms-mt-base ms-mb-lg">
```

## 🧩 Components

### Buttons

```html
<!-- Primary Button (Green) -->
<button class="ms-btn ms-btn-primary">Submit</button>

<!-- Secondary Button (Outlined) -->
<button class="ms-btn ms-btn-secondary">Cancel</button>

<!-- Danger Button (Red) -->
<button class="ms-btn ms-btn-danger">Delete</button>
```

### Cards

```html
<div class="ms-card">
  <div class="ms-card-header">Card Title</div>
  <p class="ms-text-secondary">Card content goes here...</p>
</div>
```

### Input Fields

```html
<input type="text" class="ms-input" placeholder="Enter text...">
<textarea class="ms-input" placeholder="Enter message..."></textarea>
<select class="ms-input">
  <option>Option 1</option>
  <option>Option 2</option>
</select>
```

### Badges/Tags

```html
<span class="ms-badge ms-badge-success">Active</span>
<span class="ms-badge ms-badge-warning">Pending</span>
<span class="ms-badge ms-badge-danger">Failed</span>
<span class="ms-badge ms-badge-info">Info</span>
```

### Tables

```css
table {
  font-family: var(--ms-font-mono);
  font-size: var(--ms-text-base);
}

th {
  color: var(--ms-accent-primary);
  text-transform: uppercase;
  letter-spacing: var(--ms-tracking-wide);
  font-weight: var(--ms-font-semibold);
}

td {
  color: var(--ms-text-secondary);
  border-bottom: 1px solid var(--ms-border-default);
}

tr:hover {
  background: var(--ms-accent-subtle);
}
```

## 🎭 Utility Classes

### Text Colors

```html
<p class="ms-text-primary">White text</p>
<p class="ms-text-secondary">Grey text</p>
<p class="ms-text-accent">Green text</p>
<p class="ms-text-success">Success green</p>
<p class="ms-text-warning">Warning yellow</p>
<p class="ms-text-danger">Danger red</p>
```

### Font Sizes

```html
<p class="ms-text-xs">Extra small</p>
<p class="ms-text-sm">Small</p>
<p class="ms-text-base">Base</p>
<p class="ms-text-lg">Large</p>
<p class="ms-text-xl">Extra large</p>
```

### Spacing

```html
<div class="ms-mt-base">Margin top</div>
<div class="ms-mb-lg">Margin bottom</div>
<div class="ms-p-xl">Padding all sides</div>
```

### Text Transform

```html
<p class="ms-uppercase">UPPERCASE TEXT</p>
<p class="ms-tracking-wider">Spaced Out Text</p>
```

## ✨ Animations

```html
<!-- Fade in animation -->
<div class="ms-animate-fade-in">Content fades in</div>

<!-- Slide in animation -->
<div class="ms-animate-slide-in">Content slides in</div>

<!-- Glow effect -->
<div class="ms-animate-glow">Glowing element</div>
```

Or use custom CSS:

```css
.my-element {
  animation: ms-fade-in 0.5s ease-out forwards;
}
```

## 📱 Responsive Design

Use the breakpoint variables:

```css
/* Mobile First */
.container {
  width: 100%;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    width: 960px;
  }
}
```

## 🎯 Best Practices

### 1. Always Use Uppercase for Navigation & Labels

```html
<!-- Good -->
<button class="ms-uppercase ms-tracking-wider">Submit</button>

<!-- Bad -->
<button>Submit</button>
```

### 2. Increase Letter Spacing for Uppercase

```css
.nav-item {
  text-transform: uppercase;
  letter-spacing: var(--ms-tracking-wider); /* 0.1em */
}
```

### 3. Use Green for Primary Actions

```html
<!-- Primary action = green -->
<button class="ms-btn-primary">Save</button>

<!-- Secondary action = outlined -->
<button class="ms-btn-secondary">Cancel</button>
```

### 4. Maintain Dark Aesthetic

Always use dark backgrounds with subtle borders:

```css
.card {
  background: var(--ms-bg-card);
  border: 1px solid var(--ms-border-default); /* rgba - subtle */
}
```

### 5. Provide Hover Feedback

Every interactive element should have hover states:

```css
.button:hover {
  transform: translateY(-2px);
  box-shadow: var(--ms-shadow-md);
}
```

### 6. Use JetBrains Mono for Data

```html
<!-- Financial data, code, technical info -->
<div class="ms-font-mono">
  <span class="ms-text-accent">$2,450.00</span>
</div>
```

## 🔧 Framework Integration

### React/Next.js

```jsx
import './ms-variables.css';

export default function Button({ children, variant = 'primary' }) {
  return (
    <button className={`ms-btn ms-btn-${variant}`}>
      {children}
    </button>
  );
}
```

### Vue.js

```vue
<template>
  <button :class="`ms-btn ms-btn-${variant}`">
    <slot />
  </button>
</template>

<script>
export default {
  props: ['variant']
}
</script>

<style>
@import './ms-variables.css';
</style>
```

### Tailwind CSS

Create a tailwind config using the JSON values:

```javascript
const msDesignSystem = require('./ms-design-system.json');

module.exports = {
  theme: {
    extend: {
      colors: {
        'ms-accent': msDesignSystem.colors.accent.green,
        'ms-bg': msDesignSystem.colors.primary.background,
      },
      fontFamily: {
        'sans': msDesignSystem.typography.fonts.primary.split(','),
        'mono': msDesignSystem.typography.fonts.mono.split(','),
      }
    }
  }
}
```

## 📊 Component Examples

### Full Page Layout

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="ms-variables.css">
</head>
<body class="ms-bg-primary">
  <!-- Logo -->
  <div style="position: fixed; top: 20px; left: 20px;" 
       class="ms-text-muted ms-uppercase ms-tracking-wider">
    m&s
  </div>

  <!-- Navigation -->
  <nav style="position: fixed; top: 50%; left: 20px; transform: translateY(-50%);">
    <div class="ms-text-tertiary ms-uppercase ms-text-sm ms-tracking-wider">Home</div>
    <div class="ms-text-accent ms-uppercase ms-text-sm ms-tracking-wider">Dashboard</div>
  </nav>

  <!-- Main Content -->
  <main style="max-width: 1200px; margin: 0 auto; padding: 80px 20px;">
    <h1 class="ms-text-3xl ms-text-accent ms-mb-lg">Welcome</h1>
    
    <div class="ms-card">
      <div class="ms-card-header">Overview</div>
      <p class="ms-text-secondary">Your content here...</p>
    </div>
  </main>
</body>
</html>
```

### Form Example

```html
<form class="ms-card">
  <div class="ms-card-header">Contact Form</div>
  
  <div class="ms-mb-base">
    <label class="ms-text-tertiary ms-text-xs ms-uppercase ms-tracking-wide">
      Name
    </label>
    <input type="text" class="ms-input" placeholder="John Doe">
  </div>
  
  <div class="ms-mb-base">
    <label class="ms-text-tertiary ms-text-xs ms-uppercase ms-tracking-wide">
      Message
    </label>
    <textarea class="ms-input" rows="4"></textarea>
  </div>
  
  <button type="submit" class="ms-btn ms-btn-primary">
    Submit
  </button>
</form>
```

## 🎨 Color Palette Reference

```
Backgrounds:
- Primary: #0f0f0f (very dark grey)
- Secondary: #1a1a1a (dark grey)
- Card: rgba(15, 15, 15, 0.95) (translucent dark)

Accent (Green):
- Primary: #16a34a
- Light: #22c55e
- Dark: #14532d

Text:
- Primary: #ffffff (white)
- Secondary: #a0a0a0 (light grey)
- Tertiary: #808080 (medium grey)
- Muted: #4a5568 (dark grey)

Status:
- Success: #22c55e (green)
- Warning: #fbbf24 (yellow)
- Danger: #ef4444 (red)
- Info: #38bdf8 (blue)
```

## 📝 License

This design system is part of the M&S application suite.

## 🤝 Support

For questions or issues, refer to the template.html file for live examples.

---

**Version**: 1.0.0  
**Last Updated**: October 2025  
**Maintained by**: M&S Development Team

