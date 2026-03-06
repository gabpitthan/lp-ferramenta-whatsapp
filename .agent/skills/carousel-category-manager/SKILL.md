---
name: Carousel Category Manager
description: Creates and manages new carousel categories in the CATEGORY_REGISTRY of carrosseis.js. Structures data files, HTML script tags, and registry entries so new carousel batches load correctly in the viewer.
---

# Carousel Category Manager

## Purpose
The carousel viewer (`posts_instagram/carrosseis.html` + `carrosseis.js`) uses a **CATEGORY_REGISTRY** to support multiple content batches with different designs, topics, or niches. This skill manages the full lifecycle of creating, updating, and auditing categories.

## How the Category System Works

### 1. CATEGORY_REGISTRY (in `carrosseis.js`)

```javascript
const CATEGORY_REGISTRY = [
    {
        id: 'konnex-funil',           // Unique kebab-case string
        label: 'Konnex – Funil Completo',
        icon: '⚡',
        color: '#10B981',              // CSS accent color for active state
        getData: () => window.konnexCarrosseis || (typeof carrosseisData !== 'undefined' ? carrosseisData : []),
    },
    // Add new categories here
];
```

### 2. Data File Pattern

Each category needs its own `.js` data file:

```javascript
// posts_instagram/[category-id]_data.js
window.[camelCaseCategoryId]Carrosseis = [
    // array of carousel objects
];
```

**Example for clinicas:**
```javascript
// clinicas_data.js
window.clinicasCarrosseis = [ /* ... */ ];
```

### 3. HTML Script Tag (in `carrosseis.html`)

The data file must be loaded **before** `carrosseis.js`:

```html
<!-- Load category data BEFORE carrosseis.js -->
<script src="clinicas_data.js"></script>
<!-- ... existing scripts ... -->
<script src="carrosseis.js"></script>
```

### 4. CATEGORY_REGISTRY Entry

Add the entry to the registry array in `carrosseis.js`:

```javascript
{
    id: 'clinicas',
    label: 'Clínicas',
    icon: '🏥',
    color: '#3B82F6',
    getData: () => window.clinicasCarrosseis || [],
},
```

## Category Design Rules

| Field   | Rule                                                              |
|---------|-------------------------------------------------------------------|
| `id`    | kebab-case, unique, descriptive of the niche/brand               |
| `label` | Brand name + optional subtitle, max ~30 chars                    |
| `icon`  | Single emoji that represents the niche/brand                     |
| `color` | Hex color — must contrast with dark background (#0F172A)         |
| `getData` | Arrow function referencing the `window.[camelCase]Carrosseis` global |

## Suggested Icons by Niche

| Niche         | Icon | Suggested Color |
|---------------|------|-----------------|
| Clínicas      | 🏥   | `#3B82F6`       |
| Jurídico      | ⚖️   | `#8B5CF6`       |
| Imobiliário   | 🏠   | `#F59E0B`       |
| Educação      | 📚   | `#06B6D4`       |
| E-commerce    | 🛒   | `#EC4899`       |
| Restaurantes  | 🍽️   | `#EF4444`       |
| Fitness       | 💪   | `#10B981`       |
| Finanças      | 💰   | `#FBBF24`       |

## Step-by-Step: Adding a New Category

1. **Create the data file**: `posts_instagram/[id]_data.js`
   - Assign the array to `window.[camelCaseId]Carrosseis`
   - Use carousel objects with canonical structure (see carousel-content-generator skill)

2. **Add `<script>` tag** in `carrosseis.html`:
   - Before `carrosseis.js`
   - Verify order: data scripts → `carrosseis.js`

3. **Add entry to CATEGORY_REGISTRY** in `carrosseis.js`:
   - Append to the array (do not reorder existing entries)
   - Test `getData()` function references the correct global

4. **Verify** by opening `carrosseis.html` in browser:
   - New category appears in the dropdown
   - Count shows correct number of carousels
   - Navigation between slides works

## Output When Creating a Category

Always output all three components:

### Component 1: Data File Content
```javascript
// posts_instagram/[id]_data.js
window.[camelCaseId]Carrosseis = [
    // carousel objects
];
```

### Component 2: Script Tag for HTML
```html
<script src="[id]_data.js"></script>
```
Include the exact line to insert and where to insert it in `carrosseis.html`.

### Component 3: Registry Entry for carrosseis.js
```javascript
{
    id: '[id]',
    label: '[Label]',
    icon: '[emoji]',
    color: '[#hex]',
    getData: () => window.[camelCaseId]Carrosseis || [],
},
```

## Auditing Existing Categories

When asked to audit categories, check:
- [ ] Each registry entry has a corresponding `window.*Carrosseis` global
- [ ] Each data file is loaded in `carrosseis.html` before `carrosseis.js`
- [ ] No duplicate `id` values exist in the registry
- [ ] Each `getData()` function returns an array (not undefined)
- [ ] Color contrasts sufficiently against `#0F172A` background
