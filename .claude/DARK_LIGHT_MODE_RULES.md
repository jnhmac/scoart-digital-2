# Definitive Dark/Light Mode Color Rules

**Project**: Scoart Digital
**Last Updated**: 2025-12-31
**Status**: PRODUCTION STANDARD

---

## 🎯 The Core Problem We Solved

**Issue**: Text was invisible in dark mode because we mixed **Fixed-Color Sections** with **Theme-Aware Sections** and used the wrong color strategy for each.

**Solution**: Clear rules for identifying section types and applying the correct color strategy.

---

## 📋 Two Types of Sections

### Type 1: Theme-Aware Sections ✅
**Definition**: Background color CHANGES with theme (light ↔ dark)

**Examples**:
- Hero section: `bg-primary-50 dark:bg-dark-900`
- ServicesGrid: `bg-white dark:bg-dark-900`
- Footer: `bg-semantic-bg-secondary` (auto-switches)

**Color Strategy**:
```jsx
// ✅ USE SEMANTIC COLORS - they automatically switch
<section className="bg-white dark:bg-dark-900">
  <h1 className="heading-xl">
    {/* heading-xl already has semantic colors built-in */}
  </h1>
  <p className="body-lg">
    {/* body-lg already has semantic colors built-in */}
  </p>
</section>
```

**Rule**: Use `.heading-xl`, `.body-lg`, `.body-base` WITHOUT additional color classes

---

### Type 2: Fixed-Color Sections 🔒
**Definition**: Background color NEVER CHANGES regardless of theme

**Examples**:
- Features section: `bg-dark-900` (always dark, no theme variation)
- CallToAction card: `bg-gradient-to-br from-dark-900 to-dark-800` (always dark)

**Color Strategy**:
```jsx
// ✅ USE FIXED COLORS - hardcoded white/dark
<section className="bg-dark-900">
  {/* ALWAYS dark background = ALWAYS white text */}
  <h1 className="text-5xl font-display font-bold text-white">
    Heading
  </h1>
  <p className="text-lg leading-relaxed text-white">
    Paragraph
  </p>
</section>
```

**Rule**: Use explicit `text-white` or `text-gray-100` for fixed dark backgrounds

---

## 🔍 How to Identify Section Type

### Quick Test:
Look at the `className` of the section wrapper:

**Theme-Aware (Has `dark:` classes)**:
```jsx
className="bg-white dark:bg-dark-900"  // ✅ Theme-aware
className="bg-primary-50 dark:bg-dark-800"  // ✅ Theme-aware
className="bg-semantic-bg-primary"  // ✅ Theme-aware (uses CSS variables)
```

**Fixed-Color (NO `dark:` classes)**:
```jsx
className="bg-dark-900"  // 🔒 Fixed dark
className="bg-gradient-to-br from-dark-900 to-dark-800"  // 🔒 Fixed dark
className="bg-white"  // 🔒 Fixed light
```

---

## 📐 Complete Color Usage Matrix

| Section Type | Background Class | Text Color Strategy | Example |
|--------------|------------------|---------------------|---------|
| **Theme-Aware** | `bg-white dark:bg-dark-900` | Use semantic utilities | `className="heading-xl"` |
| **Theme-Aware** | `bg-semantic-bg-primary` | Use semantic utilities | `className="body-lg"` |
| **Fixed Dark** | `bg-dark-900` | Use `text-white` | `className="text-white"` |
| **Fixed Dark** | `bg-gradient-...dark-900...` | Use `text-white` or `text-gray-100` | `className="text-lg text-white"` |
| **Fixed Light** | `bg-white` (no dark:) | Use `text-dark-900` | `className="text-dark-900"` |

---

## ✅ Correct Implementation Examples

### Example 1: Theme-Aware Section (Hero)
```jsx
<section className="bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900">
  {/* ✅ Let utility classes handle colors */}
  <h1 className="heading-display">
    Scale Your Digital Business
  </h1>
  <p className="body-lg">
    We help established brands grow...
  </p>

  {/* ✅ Stats using semantic colors */}
  <div className="text-semantic-text-primary">50+</div>
  <div className="text-semantic-text-secondary">Projects</div>
</section>
```

### Example 2: Fixed Dark Section (Features)
```jsx
<section className="bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
  {/* 🔒 ALWAYS dark = ALWAYS white text */}
  <h2 className="text-5xl font-display font-bold text-white">
    Built for Performance
  </h2>
  <p className="text-lg leading-relaxed text-white">
    We combine technical excellence...
  </p>

  {/* Cards also have dark backgrounds */}
  <div className="bg-dark-800/50">
    <h3 className="text-xl font-bold text-white">
      Lightning Fast
    </h3>
    <p className="text-white leading-relaxed">
      Optimized performance...
    </p>
  </div>
</section>
```

### Example 3: Theme-Aware Section (ServicesGrid)
```jsx
<section className="bg-white dark:bg-dark-900">
  {/* ✅ Semantic utilities auto-switch */}
  <h2 className="heading-xl">
    Services That Drive Results
  </h2>
  <p className="body-lg">
    We specialize in digital solutions...
  </p>

  {/* Cards with theme-aware backgrounds */}
  <div className="bg-white dark:bg-dark-800">
    <h3 className="heading-md">
      {/* heading-md has semantic colors */}
    </h3>
    <p className="body-base">
      {/* body-base has semantic colors */}
    </p>
  </div>
</section>
```

### Example 4: Mixed Section (CallToAction)
```jsx
<section className="bg-white dark:bg-dark-900">
  {/* Outer section is theme-aware */}

  {/* Inner card is FIXED DARK */}
  <div className="bg-gradient-to-br from-dark-900 to-dark-800">
    {/* 🔒 Card is always dark = always white text */}
    <h2 className="text-5xl font-display font-bold text-white">
      Ready to Transform
    </h2>
    <p className="text-lg leading-relaxed text-gray-100">
      Join 200+ satisfied clients...
    </p>

    {/* Benefits list */}
    <ul className="text-white">
      <li className="text-white">Free consultation</li>
    </ul>
  </div>
</section>
```

---

## ❌ Common Mistakes to Avoid

### Mistake 1: Using Semantic Colors on Fixed-Color Sections
```jsx
// ❌ WRONG - Section is ALWAYS dark, but using semantic colors
<section className="bg-dark-900">
  <p className="body-lg text-semantic-text-inverse">
    {/* In DARK MODE, text-semantic-text-inverse becomes #131314 (dark) */}
    {/* Result: Dark text on dark background = INVISIBLE */}
  </p>
</section>

// ✅ CORRECT - Fixed dark = fixed white text
<section className="bg-dark-900">
  <p className="text-lg leading-relaxed text-white">
    Text is always white on always-dark background
  </p>
</section>
```

### Mistake 2: Hardcoding Colors on Theme-Aware Sections
```jsx
// ❌ WRONG - Overriding semantic utilities
<section className="bg-white dark:bg-dark-900">
  <p className="body-lg text-dark-600 dark:text-gray-300">
    {/* Defeats the purpose of semantic system */}
  </p>
</section>

// ✅ CORRECT - Let utilities handle it
<section className="bg-white dark:bg-dark-900">
  <p className="body-lg">
    {/* body-lg already has correct semantic colors */}
  </p>
</section>
```

### Mistake 3: Forgetting text-inverse Exists
```jsx
// ❌ WRONG - Using theme-switching colors
<section className="bg-dark-900">
  <p className="text-semantic-text-primary">
    {/* This will switch with theme - bad for fixed backgrounds */}
  </p>
</section>

// ✅ CORRECT - Fixed white text
<section className="bg-dark-900">
  <p className="text-white">
    {/* Always white on always-dark background */}
  </p>
</section>
```

---

## 🛠️ Implementation Checklist

### For Each Component:

#### Step 1: Identify Section Type
- [ ] Does the background have `dark:` classes?
  - YES = Theme-Aware Section
  - NO = Fixed-Color Section

#### Step 2: Choose Color Strategy
- [ ] **Theme-Aware**: Use `.heading-xl`, `.body-lg`, `.body-base`
- [ ] **Fixed-Color**: Use explicit `text-white` or `text-dark-900`

#### Step 3: Verify Implementation
- [ ] No manual color overrides on utility classes
- [ ] Fixed-dark sections use `text-white` consistently
- [ ] Theme-aware sections use semantic utilities
- [ ] No `text-semantic-*` classes on fixed-color sections

#### Step 4: Test Both Modes
- [ ] Text readable in light mode
- [ ] Text readable in dark mode
- [ ] No invisible text anywhere
- [ ] Correct contrast ratios (WCAG AA minimum)

---

## 🎨 Semantic Utilities Reference

### Typography Utilities (Theme-Aware)
```css
.heading-display → text-semantic-text-primary (auto-switches)
.heading-xl     → text-semantic-text-primary (auto-switches)
.heading-lg     → text-semantic-text-primary (auto-switches)
.heading-md     → text-semantic-text-primary (auto-switches)
.body-lg        → text-semantic-text-secondary (auto-switches)
.body-base      → text-semantic-text-secondary (auto-switches)
```

**Rule**: NEVER add color classes to these utilities
```jsx
// ❌ WRONG
<h1 className="heading-xl text-dark-900 dark:text-gray-100">

// ✅ CORRECT
<h1 className="heading-xl">
```

---

## 🧪 Testing Protocol

### Manual Testing:
1. Toggle dark mode ON
2. Scroll through entire page
3. Verify every text element is readable
4. Check contrast with browser DevTools
5. Toggle dark mode OFF
6. Repeat verification

### Automated Checks:
```bash
# Search for problematic patterns
grep -r "bg-dark-900.*text-semantic" components/
grep -r "bg-gradient.*dark-900.*text-semantic" components/
grep -r 'className="body-.*text-' components/
```

### Visual Regression:
- Take screenshots in both modes
- Compare side-by-side
- Look for:
  - Invisible text
  - Low-contrast text
  - Inconsistent styling

---

## 📊 Component Audit Results

| Component | Section Type | Status | Notes |
|-----------|-------------|--------|-------|
| Hero.jsx | Theme-Aware | ✅ Fixed | Uses semantic utilities |
| Features.jsx | Fixed Dark | ✅ Fixed | Uses `text-white` |
| ServicesGrid.jsx | Theme-Aware | ✅ Fixed | Uses semantic utilities |
| CallToAction.jsx | Mixed | ✅ Fixed | Outer theme-aware, inner fixed-dark |
| Footer.jsx | Theme-Aware | ✅ Fixed | Uses semantic colors |

---

## 🎓 Quick Decision Tree

```
Is the background ALWAYS the same color?
├─ YES (Fixed-Color Section)
│   └─ Use explicit text-white or text-dark-900
│
└─ NO (Theme-Aware Section)
    └─ Does it have theme-switching backgrounds?
        ├─ YES
        │   └─ Use .heading-xl, .body-lg (semantic utilities)
        │
        └─ Uses semantic-bg-* classes?
            └─ YES
                └─ Use .heading-xl, .body-lg (semantic utilities)
```

---

## ✅ Final Rules Summary

### Golden Rules:

1. **Fixed Dark Backgrounds** → `text-white` or `text-gray-100`
2. **Fixed Light Backgrounds** → `text-dark-900` or `text-dark-700`
3. **Theme-Aware Backgrounds** → Use `.heading-xl`, `.body-lg`, `.body-base`
4. **NEVER** add color classes to semantic typography utilities
5. **ALWAYS** test both light and dark modes before committing

### Before Committing:
```bash
# Run this check
npm run dev
# 1. Toggle dark mode
# 2. Scroll through page
# 3. Verify all text is readable
# 4. If any text is invisible, find the section and apply correct rules
```

---

**Maintained by**: Scoart Digital Development Team
**Enforced**: Mandatory for all frontend work
**Version**: 1.0.0 - Production Standard
