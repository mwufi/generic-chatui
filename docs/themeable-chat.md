# Themeable Chat Component System

## Core Message Component Structure

The unified `ThemeableMessage` component will expose these key areas for theming:

### Layout Areas
- Container: The outermost wrapper for message alignment and spacing
- Avatar: User/assistant profile picture or fallback
- Content Area: Main message content wrapper
- Header: Username, timestamp, and status indicators
- Bubble: The actual message content container
- Footer: Reactions, status, and action buttons
- Action Bar: Hover actions like edit, delete, react

### CSS Variables for Theming

```css
/* Layout & Spacing */
--message-padding: 1rem;
--message-gap: 0.75rem;
--message-max-width: 70%;
--avatar-size: 2.5rem;

/* Colors */
--message-bg: #fff;
--message-text: #000;
--message-border: transparent;
--avatar-bg: #f0f0f0;
--header-text: #666;
--footer-text: #888;

/* Typography */
--message-font: system-ui;
--message-font-size: 0.875rem;
--header-font-size: 0.75rem;
--footer-font-size: 0.675rem;

/* Shapes */
--bubble-radius: 1rem;
--avatar-radius: 50%;
--container-radius: 0.5rem;

/* Effects */
--hover-opacity: 0.8;
--transition-speed: 200ms;
--hover-bg: rgba(0, 0, 0, 0.05);
```

### Theme Examples

1. **iMessage Theme**
   - Rounded bubbles with different colors for user/assistant
   - Minimal avatar usage
   - Bottom-aligned timestamp
   - Blue/gray color scheme

2. **Slack Theme**
   - Square-ish bubbles with hover actions
   - Prominent avatars
   - Rich reaction system
   - Top metadata with username/time

3. **Bumble Theme**
   - Yellow accent colors
   - Rounded corners
   - Status indicators
   - Match badges

4. **Halloween Theme**
   - Dark background with spooky patterns
   - Orange/purple color scheme
   - Custom spooky avatars
   - Themed reaction emojis

## Container Theming

The chat container will also be themeable with variables for:
- Background color/image
- Scrollbar styling
- Input area styling
- Toolbar appearance

## Implementation Strategy

1. Create base `ThemeableMessage` component
2. Create theme CSS files (iMessage.css, slack.css, etc.)
3. Add theme switcher to playground
4. Implement container theming
5. Add theme preview in settings

## Benefits

- Reduced code duplication
- Easier theme creation
- Better separation of concerns
- More maintainable codebase
- Faster prototyping of new themes 