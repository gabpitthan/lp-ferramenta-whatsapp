---
name: Layout Fixer
description: Automatically diagnoses and fixes CSS/JS layout bugs found in a web page — invisible elements, overflow issues, broken grids, responsive failures, icon misalignment, and z-index problems. Always verifies fixes with before/after screenshots.
---

# Layout Fixer Skill

## Purpose
Take a bug report (from Layout Auditor or manual observation) and systematically fix each layout issue in CSS, JS, or HTML. Always verify fixes with browser screenshots.

## Pre-requisites
- Bug report from `layout-auditor` skill OR a direct description of the bugs
- Access to `styles.css`, `app.js`, and `index.html`

## Common Bug Patterns & Fixes

### BUG-001: Elements invisible (opacity:0 not resolving)
**Symptom:** Sections appear blank white when scrolled to  
**Cause:** Scroll animation adds opacity:0 synchronously on load, but IntersectionObserver fires too late  
**Fix:**
```javascript
// In app.js — Only hide elements BELOW the initial viewport
const viewportH = window.innerHeight;
els.forEach(el => {
  const rect = el.getBoundingClientRect();
  const isInView = rect.top < viewportH && rect.bottom > 0;
  if (!isInView) {
    el.classList.add('reveal-ready'); // CSS handles opacity:0
  }
  // In-view elements: never touch their opacity
});
```

### BUG-002: Horizontal scroll exists
**Symptom:** Page has a horizontal scrollbar; content overflows on mobile  
**Cause:** Fixed widths, padding without box-sizing, or absolute positioned elements with `right: -X%`  
**Fix:**
```css
/* Prevent overflow at root level */
html, body { overflow-x: hidden; max-width: 100%; }
/* Find the culprit — add to body temporarily: */
* { outline: 1px solid red !important; }
/* Fix absolute positioned elements: */
.float-element { right: max(-10%, -80px); }
```

### BUG-003: Hero headline too large — overflows or wraps badly
**Symptom:** Headline wraps into too many lines, or overflows at small breakpoints  
**Cause:** Fixed font-size instead of fluid `clamp()`  
**Fix:**
```css
.hero-headline {
  font-size: clamp(1.8rem, 4vw, 3.5rem); /* Never smaller than 1.8rem, never larger than 3.5rem */
  line-height: 1.1;
  word-break: break-word; /* Prevent overflow */
}
```

### BUG-004: Bento grid / CSS grid breaks on tablet
**Symptom:** Grid columns don't rearrange correctly at mid-size viewports  
**Cause:** Fixed `grid-template-columns` without responsive breakpoints  
**Fix:**
```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* Desktop */
}
@media (max-width: 1024px) {
  .bento-grid { grid-template-columns: repeat(2, 1fr); }
  .bento-lg, .bento-wide { grid-column: span 2; }
}
@media (max-width: 768px) {
  .bento-grid { grid-template-columns: 1fr; }
  .bento-lg, .bento-wide { grid-column: span 1; }
}
```

### BUG-005: Pricing cards stacked vertically on desktop
**Symptom:** Cards stack instead of showing side-by-side  
**Cause:** Parent has `flex-direction: column` or `grid-template-columns: 1fr`  
**Fix:**
```css
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
@media (max-width: 1024px) {
  .pricing-grid {
    grid-template-columns: 1fr;
    max-width: 440px;
    margin: 0 auto;
  }
}
```

### BUG-006: Icons/emojis misaligned or wrong size
**Symptom:** Icon appears below or aside from text, or takes unexpected space  
**Cause:** Display mode or line-height issue  
**Fix:**
```css
.icon { display: inline-block; line-height: 1; vertical-align: middle; }
/* OR for block icons: */
.bento-icon { display: block; font-size: 2rem; margin-bottom: 16px; line-height: 1; }
```

### BUG-007: Mobile menu not showing/hiding correctly
**Symptom:** Menu stays open, or doesn't open at all  
**Cause:** aria-hidden logic vs. display:flex conflict  
**Fix:**
```javascript
// Use display style directly AND aria attributes
const open = () => {
  menu.style.display = 'flex';
  menu.setAttribute('aria-hidden', 'false');
  toggle.setAttribute('aria-expanded', 'true');
};
const close = () => {
  menu.style.display = '';
  menu.setAttribute('aria-hidden', 'true');
  toggle.setAttribute('aria-expanded', 'false');
};
```

### BUG-008: Section header text invisible (wrong color contrast)
**Symptom:** Section title invisible against background  
**Cause:** Color variable missing or wrong  
**Fix:**
```css
.section-title { color: var(--navy, #0B1628); } /* Always provide fallback */
.dark-section .section-title { color: #fff; }
```

### BUG-009: Float/absolute elements overflow container
**Symptom:** Rounded badges or floating cards extend beyond visible area  
**Cause:** Negative positioning without `overflow: hidden` on parent  
**Fix:**
```css
/* Option A: Clip the parent */
.hero-visual { overflow: hidden; }
/* Option B: Constrain the float element */
.float-metric { max-width: min(200px, 35%); right: max(-5%, -60px); }
```

### BUG-010: Sticky CTA showing on desktop
**Symptom:** Mobile-only sticky button appears on desktop  
**Cause:** Display logic not scoped to mobile-only  
**Fix:**
```css
.mobile-sticky { display: none; } /* OFF by default */
@media (max-width: 768px) {
  .mobile-sticky { display: block; } /* Only show on mobile */
}
```

## Workflow

### Step 1 — Read the Bug Report
List all bugs with their severity (Critical / Major / Minor).

### Step 2 — Fix Each Bug
For each bug:
1. Identify the root cause (CSS, JS, or HTML)
2. Apply the fix from the patterns above OR write a targeted fix
3. Verify the fix doesn't break other sections

### Step 3 — Verify Fixes with Browser
After all fixes:
1. Open the page in the browser at 1440px
2. Scroll through every section — take screenshots
3. Resize to 390px — scroll through again
4. Check the automated metrics (no horizontal scroll, no invisible elements)

### Step 4 — Report
```markdown
# Layout Fix Report

## Fixes Applied
| Bug | Root Cause | Fix Applied | Status |
|-----|-----------|-------------|--------|
| BUG-001 | IntersectionObserver race | below-fold-only reveal | ✅ Fixed |

## Verification
- Desktop 1440px: ✅ All sections visible
- Mobile 390px: ✅ All sections visible, no horizontal scroll
- Automated checks: 0 invisible elements, 0 overflow issues

## Layout Score: 9.2/10
```

## Output
1. List of fixes applied with root cause explanation
2. Before/after screenshots
3. Final layout health score
