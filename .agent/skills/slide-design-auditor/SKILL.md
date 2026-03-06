---
name: Slide Design Auditor
description: Audita a qualidade visual e estrutural dos slides HTML/CSS do visualizador de carrosséis. Detecta problemas de overflow, texto cortado, contraste insuficiente, slides vazios, e tipos de slide não suportados no renderizador.
---

# Slide Design Auditor

## Purpose
Audit the visual quality, structural integrity, and rendering correctness of carousel slides in the `posts_instagram` viewer. This skill ensures all slides render correctly at the canonical 1080×1350px format before download.

## Project Files to Audit

| File | Purpose |
|------|---------|
| `posts_instagram/carrosseis.html` | Main viewer HTML + embedded CSS |
| `posts_instagram/style.css` | Slide rendering styles |
| `posts_instagram/carrosseis.js` | Slide rendering logic |
| `posts_instagram/carrosseis_data.js` | Carousel content data |

## Canonical Slide Dimensions

- **Width**: 1080px
- **Height**: 1350px (4:5 ratio — Instagram portrait carousel format)
- **Download format**: PNG at pixel ratio 1 via `html-to-image`
- **Canvas element**: `#postCaptureArea`

## Supported Slide Types & Required Fields

| Type | Required Fields | Common Issues |
|------|----------------|---------------|
| `COVER` | `title`, `imageUrl` | Title too long (overflow), missing imageUrl |
| `MYTH` | `myth`, `truth`, `imageUrl` | Long myth/truth text overflowing pane |
| `CONTENT` | `subtitle`, `text`, `imageUrl` | Missing subtitle, text too long |
| `CHECKLIST` | `title`, `items[]`, `imageUrl` | More than 4 items (layout breaks), items too long |
| `CTA` | `heading`, `text`, `imageUrl` | Missing heading (fallback "Pronto para Escalar?") |
| `DETAIL` | `badge1`, `text1`, `badge2`, `text2`, `imageUrl` | text1/text2 overflow, missing badges |
| `DETAIL_RULE` | `badge1`, `text1`, `rule`, `imageUrl` | Missing rule field |
| `STAT_SLIDE` | `stat`, `text`, `imageUrl` | Stat string too long |
| `QUOTE` | `quote`, `author`, `imageUrl` | Author field missing, quote too long |

## Audit Checklist

### Structural Checks
- [ ] All carousels have exactly 6 slides (canonical structure: COVER → MYTH → CONTENT → CHECKLIST → DETAIL → CTA)
- [ ] Every slide has a `type` field matching one of the supported types above
- [ ] Every slide has an `imageUrl` field (can be empty string but not missing)
- [ ] `CHECKLIST` slides have exactly 4 items in the `items` array
- [ ] No slide has an undefined or null required field

### Content Length Checks (for 1080px width at default font scale)
| Field | Max Recommended Characters |
|-------|---------------------------|
| `COVER.title` | 80 characters |
| `MYTH.myth` or `MYTH.truth` | 120 characters each |
| `CONTENT.text` | 300 characters |
| `CHECKLIST.items[i]` | 80 characters each |
| `DETAIL.text1` or `DETAIL.text2` | 200 characters each |
| `CTA.text` | 150 characters |

### Visual Quality Checks (inspect in browser)
- [ ] No text overflows the slide boundaries
- [ ] Background layers (grid, orbs) are visible and not covering text
- [ ] Image (`carousel-image-bg`) is loading and the fade overlay is applied
- [ ] Navigation dots render correctly (active dot wider)
- [ ] Logo watermark is visible in bottom-right or top-left
- [ ] Slide counter updates on navigation
- [ ] `fontScaleLabel` reflects the current scale after increment/decrement

### Download Quality Checks
- [ ] Downloaded PNG matches 1080×1350px exactly
- [ ] Filename format: `konnex-carrossel-{id}-slide-{index}.png`
- [ ] No CORS errors in console when capturing images from `picsum.photos`
- [ ] No watermarks from third-party image services

## Common Bugs & Fixes

### Bug: Text overflow in COVER slide
**Symptom**: Title text is cut off at the right edge  
**Fix**: In `carrosseis_data.js`, shorten `title` to under 80 characters, OR reduce font-size via `--fs` variable

### Bug: CHECKLIST items layout broken with 5+ items
**Symptom**: Items overflow below the slide bottom  
**Fix**: Limit `items` array to exactly 4 entries per slide. Split into two CHECKLIST slides if more content needed.

### Bug: Image not loading (CORS error)
**Symptom**: White/broken image in slide  
**Fix**: Verify `picsum.photos` URL pattern. The viewer adds `crossorigin="anonymous"` automatically. Ensure `fallbackUrl` is also a CORS-safe source.

### Bug: Category dropdown shows 0 carousels
**Symptom**: New category shows "(0)" count in dropdown  
**Fix**: Verify `window.[camelCaseId]Carrosseis` global is defined BEFORE `carrosseis.js` loads. Check `<script>` tag order in `carrosseis.html`.

### Bug: Caption not updating on carousel change
**Symptom**: Caption textarea shows wrong carousel's caption  
**Fix**: Check that `window.renderSlide` is properly patched in `carrosseis.js`. The caption module monkey-patches `renderSlide` — ensure it runs after DOMContentLoaded.

## Audit Report Format

When producing an audit report, use this structure:

```
## Carousel Audit Report

### Summary
- Total carousels: [N]
- Carousels with issues: [N]
- Slides with issues: [N]

### Critical Issues (break functionality)
| Carousel ID | Slide # | Type | Issue | Fix |
|-------------|---------|------|-------|-----|

### Warnings (visual degradation, no functional break)
| Carousel ID | Slide # | Field | Warning | Suggestion |
|-------------|---------|-------|---------|------------|

### Passed Checks
- [List of checks that passed]
```
