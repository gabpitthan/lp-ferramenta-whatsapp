---
name: Layout Auditor
description: Audits visual layout of web pages across desktop and mobile viewports, detecting all visual bugs (overflow, invisible elements, misaligned icons, broken grids, wrong sizes, z-index issues) and producing a structured bug report with severity scoring.
---

# Layout Auditor Skill

## Purpose
Systematically audit web page layout across desktop and mobile viewports. Detect ALL visual bugs and produce a prioritized fix list.

## Workflow

### Phase 1 — Setup
1. Open the target URL in the browser (use `file://` prefix for local files)
2. Wait 1.5 seconds for JS and fonts to load
3. Record the current viewport dimensions

### Phase 2 — Desktop Audit (1440px × 900px)
1. Resize browser to 1440px wide
2. Reload page fresh
3. Wait 1 second
4. **Section-by-Section Screenshot**: Scroll to each section and take a screenshot:
   - Hero (top of page, no scroll)
   - Below-hero sections (integrations, problem)
   - Features / cards grid
   - Cases / testimonials
   - Pricing section
   - FAQ / accordion
   - CTA section
   - Footer
5. **For each screenshot, check:**
   - Any element with `opacity: 0` that should be visible
   - Text or elements overflowing the container width
   - Icons or images that appear too large, too small, or misaligned
   - Empty white space that shouldn't be there
   - Grid/flex layouts broken (wrong stacking, wrong gap, wrong column count)
   - Z-index issues (overlapping elements incorrectly)
   - Fonts not loading (shows system fallback)
   - Buttons or CTAs cut off or partially visible

### Phase 3 — Mobile Audit (390px × 844px — iPhone 14)
1. Resize browser to 390px wide
2. Reload page fresh
3. Wait 1 second
4. Screenshot each section as above
5. **Additional Mobile Checks:**
   - Horizontal scroll (MUST NOT EXIST — use `document.body.scrollWidth > window.innerWidth`)
   - Text too small (< 14px computed font-size)
   - Tap targets too small (< 44px height for interactive elements)
   - Mobile menu functionality
   - Mobile sticky CTA visible and positioned correctly
   - Touch-friendly spacing between clickable elements

### Phase 4 — Automated Checks (JavaScript)
Run these checks via `execute_browser_javascript`:

```javascript
// Check for horizontal overflow
const hasHorizScroll = document.body.scrollWidth > window.innerWidth;

// Check for zero-opacity visible elements
const invisibleEls = Array.from(document.querySelectorAll('*'))
  .filter(el => {
    const style = window.getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    return style.opacity === '0' && rect.height > 0 && rect.width > 0 && !el.hidden;
  })
  .map(el => el.className + ' | ' + el.tagName);

// Check for overflow:hidden cutting content
const overflowIssues = Array.from(document.querySelectorAll('section, main, .container'))
  .filter(el => {
    const rect = el.getBoundingClientRect();
    return el.scrollWidth > el.clientWidth + 2;
  })
  .map(el => el.className);

console.log('Horizontal scroll:', hasHorizScroll);
console.log('Invisible visible elements:', invisibleEls);
console.log('Overflow issues:', overflowIssues);
```

### Phase 5 — Bug Report
Produce a structured bug report:

```markdown
# Layout Audit Report — [Page Name]
**Date:** [date]  **Viewport:** Desktop 1440px + Mobile 390px

## Critical Bugs (Fix Immediately)
| # | Section | Bug | Evidence | Impact |
|---|---------|-----|----------|--------|
| 1 | Pricing | Cards invisible (opacity:0) | Screenshot X | Users cannot see prices |

## Major Bugs (Fix Before Launch)
| # | Section | Bug | Evidence | Impact |
|---|---------|-----|----------|--------|

## Minor Bugs (Fix When Possible)
| # | Section | Bug | Evidence | Impact |
|---|---------|-----|----------|--------|

## ✅ Sections Passing
- Hero: ✅ correct
- Features: ✅ correct
...

## Automated Check Results
- Horizontal scroll: ❌ / ✅
- Invisible elements: [count]
- Overflow issues: [count]
```

## Scoring
| Score | Meaning |
|-------|---------|
| 9-10 | Production ready |
| 7-8  | Minor fixes needed |
| 5-6  | Significant issues |
| < 5  | Critical failures — block release |

## Output
Return:
1. The structured bug report
2. A layout health score (1-10)
3. Numbered list of fixes ordered by priority
4. Screenshots of each detected bug (labeled)
