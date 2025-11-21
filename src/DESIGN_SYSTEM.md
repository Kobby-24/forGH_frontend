# Modern Minimalist UI Design System

## Overview

This design system implements a sleek, modern, and minimalist web application interface with semi-transparent dark UI elements, sophisticated typography, and a premium feel. The design is layered above a background image with careful use of transparency to maintain visual hierarchy and readability.

## Color Palette

### Primary Colors

- **Primary Dark**: `#1a1a2e` - Main container backgrounds
- **Primary Light**: `#2d3561` - Hover states and secondary surfaces
- **Primary Very Dark**: `#0f0f1e` - Deep backgrounds and base color

### Accent Colors

- **Secondary (Purple)**: `#7b68ee` - Interactive elements, highlights, focus states
- **Secondary Light**: `#9d84eb` - Hover states for secondary actions
- **Secondary Dark**: `#5a4fb8` - Pressed states

### Text Colors

- **Text Primary**: `#e8ecf1` - Main text content
- **Text Secondary**: `#a9b3c1` - Labels, subtitles, muted text
- **Text Disabled**: `#667080` - Disabled elements

### Transparency & Glassmorphism

- **Surface Semi-transparent**: `rgba(26, 26, 46, 0.6)` - Main UI container backgrounds
- **Surface Light**: `rgba(45, 53, 97, 0.5)` - Hover states and inputs
- **Surface Dark**: `rgba(15, 15, 30, 0.8)` - Deep backgrounds
- **Border Color**: `rgba(168, 178, 196, 0.12)` - Subtle dividers

## Typography

### Font Family

- **Primary**: `'Inter'`, `'Segoe UI'`, `'Roboto'`, sans-serif (Clean, modern sans-serif)
- **Code**: `'Fira Code'`, `'Source Code Pro'`, monospace

### Typography Scale

| Level      | Size     | Weight | Letter Spacing | Usage                    |
| ---------- | -------- | ------ | -------------- | ------------------------ |
| H1         | 2.5rem   | 700    | -0.5px         | Page titles              |
| H2         | 2rem     | 600    | -0.25px        | Major headings           |
| H3         | 1.5rem   | 600    | 0px            | Section headings         |
| H4         | 1.25rem  | 600    | 0px            | Subsection headings      |
| H5         | 1.125rem | 500    | 0px            | Card titles              |
| H6         | 1rem     | 500    | 0.25px         | Minor headings           |
| Subtitle 1 | 1rem     | 400    | 0.125px        | Description text (muted) |
| Subtitle 2 | 0.875rem | 500    | 0.125px        | Secondary labels         |
| Body 1     | 1rem     | 400    | 0.125px        | Regular body text        |
| Body 2     | 0.875rem | 400    | 0.125px        | Small body text          |
| Button     | -        | 500    | 0.25px         | Button labels            |
| Caption    | 0.75rem  | 400    | 0.4px          | Very small text, hints   |

## Design Components

### Navigation Bar (AppBar)

- **Background**: `rgba(26, 26, 46, 0.75)` with 10px blur
- **Height**: 64px
- **Border**: 1px solid `rgba(168, 178, 196, 0.12)` (bottom)
- **Shadow**: `0 2px 20px rgba(0, 0, 0, 0.3)`
- **Features**:
  - Semi-transparent with glassmorphism effect
  - Blends with background image
  - Clear navigation categories
  - Search functionality (admin only)
  - User menu with logout

### Cards & Containers

- **Background**: `rgba(26, 26, 46, 0.6)` with 8px blur
- **Border**: 1px solid `rgba(168, 178, 196, 0.12)`
- **Border Radius**: 12px
- **Transition**: All 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- **Hover State**:
  - Background opacity increases to 0.7
  - Shadow: `0 8px 32px rgba(123, 104, 238, 0.15)`
  - Border color: `rgba(123, 104, 238, 0.4)`

### Metrics Card (Three-Column)

- **Layout**: Horizontal flex container with equal spacing
- **Icon Container**:
  - Size: 50x50px
  - Background: `rgba(123, 104, 238, 0.15)`
  - Border Radius: 12px
  - Color: `#7b68ee`
- **Metric Value**:
  - Font Size: 2.5rem
  - Font Weight: 700
  - Color: `#e8ecf1`
- **Metric Label**:
  - Font Size: 0.95rem
  - Font Weight: 500
  - Color: `#a9b3c1`
  - Letter Spacing: 0.5px
  - Text Transform: uppercase
- **Dividers**: Subtle borders between metrics

### Buttons

#### Contained Button

- **Background**: `#7b68ee`
- **Text**: `#e8ecf1`
- **Hover Background**: `#9d84eb`
- **Hover Shadow**: `0 4px 12px rgba(123, 104, 238, 0.3)`
- **Border Radius**: 8px
- **Text Transform**: None (sentence case)
- **Font Weight**: 500

#### Outlined Button

- **Border**: 1px solid `rgba(123, 104, 238, 0.5)`
- **Text**: `#e8ecf1`
- **Hover Border**: `#7b68ee`
- **Hover Background**: `rgba(123, 104, 238, 0.1)`
- **Border Radius**: 8px

#### Text Button

- **Text**: `#e8ecf1`
- **Hover Background**: `rgba(123, 104, 238, 0.1)`
- **No border or shadow by default**

### Input Fields (TextField, TextArea)

- **Background**: `rgba(45, 53, 97, 0.4)`
- **Border**: 1px solid `rgba(168, 178, 196, 0.2)`
- **Border Radius**: 8px
- **Text Color**: `#e8ecf1`
- **Placeholder**: `#a9b3c1` @ 0.7 opacity
- **Focus State**:
  - Border Color: `#7b68ee`
  - Background: `rgba(45, 53, 97, 0.6)`

### Tables

- **Header Background**: `rgba(45, 53, 97, 0.4)`
- **Header Text**: `#e8ecf1` (Bold)
- **Row Text**: `#e8ecf1`
- **Border Color**: `rgba(168, 178, 196, 0.12)`
- **Row Hover**: `rgba(123, 104, 238, 0.08)` background
- **Transition**: All 0.2s ease-in-out

### Chips & Tags

- **Background**: `rgba(123, 104, 238, 0.2)`
- **Text**: `#e8ecf1`
- **Border**: 1px solid `rgba(123, 104, 238, 0.4)`

## Background & Depth

### Layering System

1. **Base Background**: Dark blue gradient backdrop (fixed)
2. **Background Image**: Radio image with brightness filter (optional, fixed)
3. **Overlay**: Semi-transparent gradient for enhanced depth
4. **UI Elements**: Semi-transparent cards with glassmorphism effect

### Shadows

- **Elevation 1**: `0 2px 16px rgba(0, 0, 0, 0.2)`
- **Elevation 2**: `0 4px 20px rgba(0, 0, 0, 0.25)`
- **Interactive Focus**: `0 4px 12px rgba(123, 104, 238, 0.3)`
- **Card Hover**: `0 8px 32px rgba(123, 104, 238, 0.15)`

## Spacing System

### Base Unit: 8px

- **xs**: 4px (0.5 spacing unit)
- **sm**: 8px (1 spacing unit)
- **md**: 16px (2 spacing units)
- **lg**: 24px (3 spacing units)
- **xl**: 32px (4 spacing units)
- **2xl**: 48px (6 spacing units)

### Common Patterns

- **Component Padding**: 16-24px (md-lg)
- **Section Gap**: 24px (lg)
- **Content Padding**: 32px (xl)
- **Border Radius**: 8px (buttons), 12px (cards)

## Effects & Animations

### Transitions

- **Default Duration**: 0.2s ease-in-out
- **Card Hover**: 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- **Button Press**: 0.2s ease-in-out

### Glassmorphism

- **Backdrop Filter**: blur(8px) for cards, blur(10px) for navbar
- **WebKit Support**: Includes `-webkit-backdrop-filter` for Safari

### Hover Effects

- **Cards**: Opacity increase + shadow enhancement + border color change
- **Buttons**: Shadow enhancement + background color shift
- **Rows**: Subtle background color change
- **Inputs**: Border color + background opacity increase

## Responsive Design

### Breakpoints

- **Mobile**: < 600px (xs)
- **Tablet**: 600-960px (sm, md)
- **Desktop**: 960-1280px (md, lg)
- **Large Desktop**: > 1280px (xl)

### Responsive Adjustments

- **Mobile**: Reduced padding (16px), single column layouts
- **Tablet**: Medium padding (24px), 2-column layouts
- **Desktop**: Full padding (32px), 3-column layouts
- **Max Width**: Container max-width 1920px

## Accessibility Considerations

### Focus States

- **Outline**: 2px solid `#7b68ee`
- **Outline Offset**: 2px
- **Border Radius**: 4px

### Color Contrast

- **Text on Primary**: WCAG AA compliant (7:1 ratio)
- **Interactive Elements**: Clearly marked with color and style changes
- **Disabled States**: Reduced opacity at 0.5

### Semantic HTML

- Proper heading hierarchy (h1-h6)
- Label associations for form elements
- ARIA attributes for complex components

## Usage Guidelines

### For All Pages

1. **Apply LayoutWrapper** for consistent page structure
2. **Use ModernCard** for content containers
3. **Use MetricsCard** for key statistics display
4. **Apply theme colors** for UI elements
5. **Maintain typography hierarchy** for readability
6. **Use consistent spacing** from spacing system
7. **Include hover/focus states** for interactivity

### Dark Mode Only

- This design system is optimized for dark mode
- No light mode variations are provided
- All colors are specifically chosen for dark backgrounds

### Icons

- Use Material-UI Icons (`@mui/icons-material`)
- Outline or minimalist fill styles
- Size: 24px for regular, 40px for prominent metrics
- Color: `#7b68ee` for accents, `#a9b3c1` for secondary

## File References

- **Theme**: `src/theme/muiTheme.js`
- **Global Styles**: `src/App.css`, `src/index.css`
- **Components**:
  - `src/components/Navbar.jsx`
  - `src/components/MetricsCard.jsx`
  - `src/components/LayoutWrapper.jsx`
  - `src/components/ModernCard.jsx`

## Implementation Notes

1. The design uses CSS-in-JS with Material-UI's `styled` API for component styling
2. Transparent backgrounds require a background image in the HTML root
3. All backdrop filters include WebKit prefixes for browser compatibility
4. Smooth transitions are applied globally via CSS
5. The theme is applied via `ThemeProvider` in App.js
