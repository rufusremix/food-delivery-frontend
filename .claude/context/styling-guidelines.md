# Styling Guidelines

FoodFlow uses:

- Tailwind CSS v4
- ShadCN UI
- Semantic design tokens

ShadCN components should be treated as project-owned components.

Customize existing components instead of replacing them.

# Prefer Existing Tokens

Prefer:

- bg-primary
- text-primary
- bg-card, etc.

Avoid:

- bg-blue-500
- text-red-500
- border-gray-300

inside application features.

Use semantic design tokens whenever possible.

# Prefer Existing Components

Before creating custom UI:

1. Can Button solve this?
2. Can Card solve this?
3. Can Badge solve this?
4. Can Input solve this?

Prefer extending existing primitives.

# Tailwind Usage

Prefer Tailwind utility classes.

Do not create custom CSS classes unless:

- The styling is reused frequently.
- The styling cannot be expressed clearly with Tailwind.

Avoid page-specific CSS files.

Prefer component-level styling.

# Component Customization

When changing a visual pattern:

Prefer:

- Updating Button
- Updating Card
- Updating Badge

instead of duplicating styling throughout the application.

The design system should remain the single source of truth.

# Layout

Prefer:

- Flexbox
- Grid
- Gap utilities

Avoid manual spacing with margins when a container gap can be used.

# Mobile First

Always design and implement mobile-first.

Rules:

- Write base (unprefixed) Tailwind classes for the smallest viewport first.
- Use `sm:` / `md:` / `lg:` / `xl:` breakpoint prefixes only to add complexity for larger screens, not to fix a desktop-first layout down to mobile.
- Every new page or component must be checked at mobile width before being considered done.
- Prefer patterns that degrade gracefully (stacked flex columns, wrapping, collapsible nav) over fixed-width layouts that only work on desktop.

# Theme Support

All UI should support light and dark mode.

Use semantic tokens instead of hardcoded colors to ensure theme compatibility.
