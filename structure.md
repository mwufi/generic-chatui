# Message Theme CSS Structure

## Core Principles
1. Flat hierarchy - single container with avatar and content
2. Layout determined by container level only
3. Theme-specific display rules (show/hide elements) via CSS
4. Consistent spacing and alignment across layouts

## Base Structure
```css
.message-container {
    /* Core layout */
    display: flex;
    gap: var(--message-gap);
    padding: var(--message-padding);
    max-width: var(--message-max-width);
}

.message-avatar {
    /* Fixed size, theme controls visibility */
    width: var(--avatar-size);
    height: var(--avatar-size);
    flex-shrink: 0;
}

.message-content {
    /* Flexible content area */
    flex: 1;
    display: flex;
    flex-direction: var(--content-direction);
    gap: var(--content-gap);
    align-items: var(--content-align);
}
```

## Layout System
1. Linear Layout (e.g. Slack)
   - Container always row direction
   - Content can be row/column based on theme
   - No position overrides for user messages

2. Alternating Layout (e.g. iMessage, Bumble)
   - Container switches direction for user messages
   - Content maintains theme-specific direction
   - User messages float right

## Theme Structure
```css
.theme-slack {
    /* Layout */
    --layout: linear;
    --content-direction: column;
    --content-align: flex-start;
    
    /* Visibility */
    --show-header: block;
    --show-timestamp: inline;
    
    /* Spacing */
    --message-gap: 0.5rem;
    --content-gap: 0.25rem;
    
    /* Theme-specific */
    --avatar-radius: 0.25rem;
    --bubble-bg: transparent;
}

.theme-bumble {
    /* Layout */
    --layout: alternating;
    --content-direction: row;
    --content-align: center;
    
    /* Visibility */
    --show-header: none;
    --show-timestamp: none;
    
    /* Theme-specific */
    --avatar-radius: 50%;
    --bubble-bg: #ffc629;
}
```

## Display Rules
- Use CSS variables for show/hide instead of React props
- Theme controls visibility via display properties
- Consistent structure across all themes

## Implementation Notes
1. Remove all layout-specific overrides
2. Use CSS variables for all theme-specific values
3. Consolidate duplicate rules
4. Remove nested selectors where possible
5. Keep all positioning relative to container
6. Use logical properties for RTL support 