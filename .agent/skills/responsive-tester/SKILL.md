---
name: Responsive Tester
description: Tests a web page for responsiveness across 5 standard breakpoints (375px, 390px, 768px, 1024px, 1440px) using a systematic checklist. Detects horizontal scroll, broken layouts, text sizing issues, tap-target violations, and produces a compatibility score per breakpoint.
---

# Responsive Tester Skill

## Purpose
Validate full responsive correctness across the 5 standard breakpoints. Goes beyond just "does it fit" to check spacing, typography, interaction targets, and conversion-critical elements.

## Breakpoints to Test

| Name | Width | Device |
|------|-------|--------|
| `xs` | 375px | iPhone SE / older phones |
| `sm` | 390px | iPhone 14 / standard mobile |
| `md` | 768px | iPad portrait |
| `lg` | 1024px | iPad landscape / small laptop |
| `xl` | 1440px | Desktop / MacBook |

## Checklist Per Breakpoint

### Layout
- [ ] No horizontal scrollbar (`body.scrollWidth <= window.innerWidth`)
- [ ] All sections have content (not blank/invisible)
- [ ] Grid/flex columns correct for breakpoint
- [ ] Hero section fits viewport height reasonably (not too short, not 3x tall)
- [ ] Navigation correct (mobile menu at xs/sm, desktop nav at lg/xl)
- [ ] Footer columns stack correctly at mobile

### Typography
- [ ] H1 (hero headline) readable — not too large (overflow) or too small (< 24px)
- [ ] Body text minimum 15px computed font-size
- [ ] No text overflow or truncation of important content
- [ ] Appropriate line-length (45-75 chars per line on desktop)

### Interaction
- [ ] All buttons minimum 44px height (WCAG tap target)
- [ ] CTA buttons fully visible and tappable above fold
- [ ] Mobile sticky CTA visible on xs/sm (if present)
- [ ] Mobile sticky hidden on lg/xl (if present)
- [ ] Menu toggle visible only on xs/sm/md — hidden on lg/xl

### Visual
- [ ] No icon/image overflow
- [ ] Cards/tiles have correct gap at each breakpoint
- [ ] Floating/absolute elements don't overflow page
- [ ] Images don't exceed container width

### Conversion Elements
- [ ] Pricing cards visible and full-width equivalent on mobile
- [ ] FAQ accordion functional at all breakpoints
- [ ] Hero CTA above fold at all breakpoints
- [ ] Social proof / trust indicators visible

## Workflow

### Phase 1 — Automated Metrics
For each breakpoint, run:
```javascript
const report = {
  viewport: window.innerWidth,
  hasHorizScroll: document.body.scrollWidth > window.innerWidth,
  scrollAmount: document.body.scrollWidth - window.innerWidth,
  invisibleSections: Array.from(document.querySelectorAll('section'))
    .filter(s => {
      const style = window.getComputedStyle(s);
      return parseFloat(style.height) < 10;
    })
    .map(s => s.id || s.className),
  h1Size: parseFloat(window.getComputedStyle(document.querySelector('h1')).fontSize),
  bodyTextSize: parseFloat(window.getComputedStyle(document.querySelector('p')).fontSize),
  smallButtons: Array.from(document.querySelectorAll('a, button'))
    .filter(el => el.getBoundingClientRect().height > 0 && el.getBoundingClientRect().height < 40)
    .map(el => el.id || el.className || el.textContent.slice(0, 30))
};
console.log(JSON.stringify(report, null, 2));
```

### Phase 2 — Visual Screenshots
At each breakpoint:
1. Take screenshot at TOP of page (no scroll)
2. Take screenshot mid-page (hero + next 2 sections in view)
3. Take screenshot of pricing section
4. Screenshot of footer

### Phase 3 — Score Per Breakpoint
Score each breakpoint 1-10:
- 10 = Perfect, no issues
- 8-9 = Minor spacing or styling issues
- 6-7 = Notable layout issues (text wrapping, small gaps)
- 4-5 = Broken grid or overflow
- 1-3 = Unusable (content invisible, horizontal scroll, major bugs)

### Phase 4 — Compatibility Matrix

```markdown
# Responsive Compatibility Report

## Summary
| Breakpoint | Width | Score | Status |
|-----------|-------|-------|--------|
| xs — iPhone SE | 375px | 8.5 | ✅ Pass |
| sm — iPhone 14 | 390px | 9.0 | ✅ Pass |
| md — Tablet   | 768px | 7.5 | ⚠️ Minor issues |
| lg — Laptop   | 1024px| 9.0 | ✅ Pass |
| xl — Desktop  | 1440px| 9.5 | ✅ Pass |

**Overall Score: 8.7 / 10**

## Issues Found
| Breakpoint | Issue | Severity | Fix |
|-----------|-------|---------|-----|
| md (768px) | Bento grid stacks weird | Major | Add 768px breakpoint rule |

## Automated Results
| Check | xs | sm | md | lg | xl |
|-------|----|----|----|----|-----|
| No horiz scroll | ✅ | ✅ | ✅ | ✅ | ✅ |
| H1 size (px) | 28 | 28 | 36 | 48 | 56 |
| Min body text | ✅ | ✅ | ✅ | ✅ | ✅ |
| Tap targets OK | ✅ | ✅ | ✅ | ✅ | ✅ |
```

## Quick Fixes Reference

### Horizontal Scroll
```css
html, body { overflow-x: hidden; }
/* Find culprit — check all elements wider than viewport: */
```

### Font Size at Mobile Too Large
```css
h1 { font-size: clamp(1.8rem, 5vw, 3.5rem); }
h2 { font-size: clamp(1.5rem, 4vw, 2.5rem); }
```

### Grid Not Responsive
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
}
```

### Tap Target Too Small
```css
.btn, a, button { min-height: 44px; padding: max(12px, 0.75rem) max(20px, 1.25rem); }
```

### Mobile Menu Breakpoint Mismatch
```css
.nav-links  { display: none; }         /* Always hidden */
.mobile-toggle { display: none; }      /* Always hidden */

@media (min-width: 769px) {  /* Desktop: show nav, hide toggle */
  .nav-links  { display: flex; }
  .header-cta { display: flex; }
}
@media (max-width: 768px) {  /* Mobile: hide nav, show toggle */
  .mobile-toggle { display: block; }
}
```

## Output
1. Compatibility matrix with score per breakpoint
2. Screenshots at each breakpoint
3. Numbered list of issues (Critical → Minor)
4. Recommended CSS fixes for each issue
5. Overall responsive health score (1-10)
