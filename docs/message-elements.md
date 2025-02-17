# Message Elements & Positioning

## Core Concept: Relative Positioning

The message component uses relative positioning to place its elements in relation to the message bubble. This makes the layout more maintainable and responsive compared to fixed positioning.

## DOM Structure
```html
<div class="message-container">
    <div class="message-avatar">...</div>
    <div class="message-content">
        <div class="message-header">...</div>
        <div class="message-bubble">
            <div class="message-text">...</div>
            <!-- Elements positioned relative to bubble go here -->
            <div class="message-actions">...</div>
        </div>
        <div class="message-footer">...</div>
    </div>
</div>
```

## Positioning System

The key to the positioning system is that elements are placed relative to the `.message-bubble`:

```css
.message-bubble {
    position: relative;  /* Makes bubble the positioning context */
}

.message-element {
    position: absolute;  /* Position relative to bubble */
}
```

## Standard Elements

### Action Buttons
```css
.message-actions {
    position: absolute;
    left: calc(100% + 0.5rem);  /* Right of bubble */
    top: 50%;
    transform: translateY(-50%);
}

/* For user messages in alternating layout */
.message-user .message-actions {
    right: calc(100% + 0.5rem);  /* Left of bubble */
    left: auto;
}
```

### Reactions
```css
.message-reactions {
    position: absolute;
    bottom: -1.5rem;  /* Below bubble */
    left: 0;
}
```

## Adding New Elements

To add new elements to the message, follow these patterns:

### 1. Side Elements
For elements that should appear beside the message:

```css
.message-side-element {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    
    /* For right side */
    left: calc(100% + 0.5rem);
    
    /* For left side */
    right: calc(100% + 0.5rem);
    left: auto;
}
```

### 2. Top/Bottom Elements
For elements that should appear above or below:

```css
.message-top-element {
    position: absolute;
    top: -1.5rem;
    left: 0;
}

.message-bottom-element {
    position: absolute;
    bottom: -1.5rem;
    left: 0;
}
```

### 3. Overlay Elements
For elements that should appear on top of the message:

```css
.message-overlay {
    position: absolute;
    inset: 0;  /* Covers entire bubble */
    display: flex;
    align-items: center;
    justify-content: center;
}
```

## Layout Considerations

### Alternating Layout
In alternating layouts, consider flipping element positions for user messages:

```css
.layout-alternating .message-user .message-side-element {
    left: auto;
    right: calc(100% + 0.5rem);
}
```

### Linear Layout
In linear layouts, maintain consistent positioning:

```css
.layout-linear .message-side-element {
    /* Same position regardless of message type */
    left: calc(100% + 0.5rem);
}
```

## Best Practices

1. **Use CSS Variables for Spacing**
   ```css
   :root {
       --message-element-gap: 0.5rem;
   }
   
   .message-element {
       left: calc(100% + var(--message-element-gap));
   }
   ```

2. **Consider Stacking Order**
   ```css
   .message-bubble { z-index: 1; }
   .message-overlay { z-index: 2; }
   .message-actions { z-index: 3; }
   ```

3. **Handle Responsiveness**
   ```css
   @media (max-width: 768px) {
       .message-side-element {
           /* Switch to top/bottom on mobile */
           left: 0;
           bottom: -2rem;
           top: auto;
           transform: none;
       }
   }
   ```

4. **Theme-Specific Positioning**
   ```css
   .theme-compact .message-element {
       --message-element-gap: 0.25rem;
   }
   
   .theme-spacious .message-element {
       --message-element-gap: 1rem;
   }
   ```

## Examples

### Status Indicator
```css
.message-status {
    position: absolute;
    bottom: -1rem;
    right: 0;
    font-size: 0.75rem;
    color: var(--muted-color);
}
```

### Edit Indicator
```css
.message-edit-badge {
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    background: var(--accent-color);
    border-radius: 50%;
    padding: 0.25rem;
}
```

### Thread Indicator
```css
.message-thread-line {
    position: absolute;
    left: -2rem;
    top: 100%;
    bottom: -2rem;
    width: 2px;
    background: var(--thread-color);
}
``` 