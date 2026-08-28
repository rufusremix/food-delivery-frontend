# Coding Guidelines

## Semantic HTML

Always prefer semantic HTML elements over generic div elements when an appropriate element exists.

Examples:

- <header>
- <main>
- <nav>
- <section>
- <article>
- <aside>
- <footer>
- <button>
- <a>
- <form>
- <time>
- <address>, etc.

Rules:

- Navigation uses links.
- Actions use buttons.
- Prefer native HTML semantics before ARIA.

## Accessibility

Accessibility is a first-class requirement.

Rules:

- Every interactive element must be keyboard accessible.
- Maintain visible focus states.
- Use proper labels for inputs.
- Prefer native HTML behavior whenever possible.
- Use ARIA only when native HTML cannot express the required semantics.

## Component Design

Prefer composition over large monolithic components.

Rules:

- Components should have a single responsibility.
- Build larger components from smaller reusable components.
- Extract reusable patterns only when repetition becomes obvious.
- Avoid premature abstraction.

## React

Rules:

- Prefer local state first.
- Avoid global state unless there is a clear need.
- Extract custom hooks only when logic becomes reusable.
- Keep components focused and easy to understand.
- Prefer explicit code over clever code.
- Always define components (and other functions) as arrow functions assigned to a `const`, not `function` declarations. Keeps the codebase modular and consistent.

  Good:

  ```tsx
  const Header = () => {
    return <header>...</header>
  }
  ```

  Avoid:

  ```tsx
  function Header() {
    return <header>...</header>
  }
  ```

## TypeScript

Rules:

- Avoid any.
- Prefer explicit types.
- Model business concepts using interfaces and types.
- Export shared types from the owning feature.

## Styling

FoodFlow uses:

- Tailwind CSS
- ShadCN
- Design Tokens

Rules:

- Use semantic design tokens whenever possible.
- Prefer existing UI components.
- Avoid hardcoded colors.
- Avoid page-specific CSS unless necessary.
- Prefer utility composition over custom CSS.

## Naming

Names should describe purpose, not implementation.

Component Names:

Good:

- OrderCard
- OrderTimeline
- DeliveryAddress
- CartSummary

Avoid:

- DataCard
- CardWrapper
- CustomCard
- UtilComponent

---

Variable Names

Good:

- order
- orderItems
- totalPrice
- selectedRestaurant
- cartQuantity

Avoid:

- data
- item
- value
- temp
- obj

unless the scope is extremely small.

---

Boolean Names

Good:

- isLoading
- isOpen
- isSubmitting
- hasError
- canCheckout

Avoid:

- loading
- open
- submit
- error

---

Function Names

Functions should describe what they do.

Good:

- calculateTotal()
- addItemToCart()
- removeCartItem()
- getRestaurantById()

Avoid:

- handleData()
- process()
- doStuff()
- update()

---

Event Handlers

Use the handle pattern.

Good:

- handleCheckout()
- handleQuantityIncrease()
- handleSearchChange()

---

Files and Folders

Use clear names.

Good:

features/orders/components/order-card.tsx

features/restaurants/components/menu-item-card.tsx

Avoid:

component.tsx

helper.tsx

utils.tsx

new.tsx

---

Code Organization

Keep related code together.

Prefer:

features/
├── orders
├── restaurants
├── cart

over large global folders.

---

Reuse Guidelines

Before creating:

- a new component
- a new hook
- a new button variant
- a new card variant

Ask:

1. Does something similar already exist?
2. Is the difference semantic or only visual?
3. Is the abstraction justified by reuse?

Prefer extending existing primitives over creating new ones.

---

States

Every async screen should consider:

- Loading
- Success
- Empty
- Error

Do not assume data always exists.

---

General Principle

Prioritize:

- Readability
- Consistency
- Simplicity
- Maintainability
