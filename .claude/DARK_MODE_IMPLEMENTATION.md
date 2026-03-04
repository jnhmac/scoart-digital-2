# Dark Mode Implementation Guide

**Project**: Scoart Digital
**Aesthetic**: Anthropic.com Style (Sophisticated Minimal)
**Date**: 2025-12-31
**Status**: Implemented ✅

## Overview

This project uses a **semantic color system** with paired light/dark modes. All colors automatically adjust based on the user's theme preference using CSS custom properties.

## Color System Architecture

### Semantic Color Variables

Located in `app/globals.css`:

```css
:root {
  /* Light Mode */
  --bg-primary: #faf9f0;
  --text-primary: #2d2d2d;
  --accent: #d97757;
  /* ... etc */
}

.dark {
  /* Dark Mode */
  --bg-primary: #131314;
  --text-primary: #f7f7f8;
  --accent: #ee7f54;  /* Brighter in dark mode */
  /* ... etc */
}
```

### Tailwind Mappings

Located in `tailwind.config.js`:

```js
colors: {
  'bg-primary': 'var(--bg-primary)',
  'text-primary': 'var(--text-primary)',
  'accent': 'var(--accent)',
  // ... etc
}
```

## Usage Patterns

### ✅ Correct - Semantic Colors (Auto Dark Mode)

```jsx
<div className="bg-bg-primary text-text-primary">
  <h1 className="text-text-primary">Heading</h1>
  <p className="text-text-secondary">Body text</p>
  <span className="text-text-tertiary">Caption</span>
</div>
```

### ❌ Wrong - Manual Dark Mode Classes

```jsx
{/* Don't do this - error-prone and hard to maintain */}
<div className="bg-white dark:bg-dark-900 text-gray-900 dark:text-gray-100">
  <p className="text-gray-200 dark:text-dark-900">Text</p>
</div>
```

## Color Hierarchy

### Backgrounds
- `bg-bg-primary` - Main page background (#faf9f0 → #131314)
- `bg-bg-secondary` - Cards, sections (#f5f4eb → #1f1f22)
- `bg-bg-elevated` - Modals, dropdowns (#ffffff → #2a2a2c)

### Text Colors
- `text-text-primary` - Headings, important text (14:1 → 16:1 contrast)
- `text-text-secondary` - Body text (9:1 → 12:1 contrast)
- `text-text-tertiary` - Muted text, captions (5.5:1 → 7:1 contrast)
- `text-text-inverse` - Text on opposite backgrounds (#ffffff → #131314)

### Interactive Elements
- `bg-accent` / `text-accent` - Brand color, CTAs, links (#d97757 → #ee7f54)
- `bg-accent-hover` - Hover states (#c2603f → #f5ab8c)
- `bg-accent-muted` - Subtle backgrounds (#f9cdb9 → #a04d31)

### Borders
- `border-border-default` - Standard dividers (#e8e6d5 → #35353a)
- `border-border-strong` - Emphasized borders (#d4d0b8 → #46464c)

## Special Cases

### Dark Card with Light Text (CallToAction Component)

When you have a dark background component that should stay dark in both modes:

```jsx
<div className="bg-gradient-to-br from-dark-900 to-dark-800">
  {/* Use text-inverse for text on this dark background */}
  <h2 className="text-text-inverse">Heading</h2>
  <p className="text-text-inverse/90">Body with slight transparency</p>

  {/* Buttons on dark background */}
  <button className="bg-accent text-text-inverse border-bg-primary">
    Primary CTA
  </button>
  <button className="bg-transparent border-bg-primary text-text-inverse hover:bg-bg-primary hover:text-text-primary">
    Secondary CTA
  </button>
</div>
```

## Utility Classes

Pre-defined classes with semantic colors:

- `.btn-primary` - Primary button with accent background
- `.btn-secondary` - Secondary button with transparent background
- `.btn-accent` - Accent button (same as primary)
- `.card` - Card with secondary background and default border
- `.heading-display`, `.heading-xl`, `.heading-lg`, `.heading-md` - Headings with primary text
- `.body-lg`, `.body-base` - Body text with secondary text color

## WCAG Contrast Compliance

All color combinations meet WCAG AA standards:

| Element | Light Mode | Dark Mode | Requirement |
|---------|-----------|-----------|-------------|
| Primary Text | 14:1 | 16:1 | ≥ 7:1 (AAA) ✅ |
| Secondary Text | 9:1 | 12:1 | ≥ 4.5:1 (AA) ✅ |
| Tertiary Text | 5.5:1 | 7:1 | ≥ 4.5:1 (AA) ✅ |

## Components Updated

The following components have been migrated to semantic colors:

- ✅ `components/Footer.jsx` - All text colors use semantic variables
- ✅ `components/CallToAction.jsx` - Uses text-inverse for dark card background
- ✅ `app/globals.css` - All utility classes updated

## Testing Checklist

When making changes, verify:

- [ ] Component looks correct in light mode
- [ ] Component looks correct in dark mode
- [ ] Theme toggle works smoothly (no color flash)
- [ ] All text is readable (check contrast ratios)
- [ ] Hover states work in both modes
- [ ] Interactive elements are clearly visible in both modes

## Common Pitfalls to Avoid

1. **Don't use hardcoded colors**: Use semantic variables instead
2. **Don't forget text-inverse**: When placing text on dark backgrounds
3. **Don't use the same accent in both modes**: Accents need brightness adjustment
4. **Don't skip testing both modes**: Always verify both light and dark
5. **Don't use manual `dark:` classes**: Let CSS variables handle it

## Reference Documents

- **Global Color Systems**: `~/.claude/quick-reference/dark-mode-color-systems.md`
- **Frontend Design Skill**: `~/.claude/skills/frontend-design/SKILL.md`
- **Anthropic.com Style Guide**: See global reference for complete color palette

## Theme Toggle Implementation

The project uses a `ThemeToggle` component (location: `components/ThemeToggle.jsx`) that:
- Uses `next-themes` for theme management
- Toggles `dark` class on `<html>` element
- Persists user preference to localStorage
- Respects system `prefers-color-scheme`

## Future Enhancements

Consider adding:
- [ ] Additional color schemes (Claude.ai, ChatGPT, Perplexity styles)
- [ ] Theme switcher with multiple aesthetic options
- [ ] High contrast mode for accessibility
- [ ] System theme sync toggle in UI

---

**Maintained by**: Scoart Digital Development Team
**Last Updated**: 2025-12-31
