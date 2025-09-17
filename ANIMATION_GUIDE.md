# Understanding animate.enter and animate.leave

## What is animate.leave?

`animate.leave` is the counterpart to `animate.enter` in Angular's View Transitions API. While `animate.enter` triggers when an element is added to the DOM, `animate.leave` triggers when an element is about to be removed from the DOM.

## Key Concepts

### 1. **Automatic Triggering**
- `animate.leave` automatically fires when Angular removes an element from the DOM
- This happens with conditional directives like `@if`, `@for`, or when components are destroyed
- The animation completes before the element is actually removed

### 2. **Timing Coordination**
- Leave animations should generally be shorter than enter animations (0.3s-0.6s vs 0.6s-1s)
- Angular waits for the leave animation to complete before removing the element
- This ensures smooth visual transitions

### 3. **Asymmetric Animations**
You can (and should) use different animations for enter and leave:

```html
<div animate.enter="slide-in-from-bottom" 
     animate.leave="slide-out-to-top">
  Content
</div>
```

## Common Animation Patterns

### 1. **Reverse Animations**
The leave animation is often the reverse of the enter animation:
- Enter: fade in + slide up → Leave: fade out + slide down
- Enter: scale from small → Leave: scale to large (or small)

### 2. **Directional Exits**
- Enter from one direction, exit to another
- Creates more dynamic and interesting transitions
- Example: slide in from left, slide out to right

### 3. **Different Animation Types**
- Enter with slide, leave with fade
- Enter with scale, leave with rotation
- Creates unique visual experiences

## Performance Considerations

### Best Practices
1. **Keep leave animations short** (0.3s-0.6s max)
2. **Use GPU-accelerated properties** (`transform`, `opacity`)
3. **Avoid animating layout properties** during leave animations
4. **Test on slower devices** to ensure smooth performance

### CSS Optimization
```css
/* Good - GPU accelerated */
@keyframes slide-out {
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}

/* Avoid - causes layout thrashing */
@keyframes bad-exit {
  to {
    height: 0;
    width: 0;
  }
}
```

## Advanced Techniques

### 1. **Staggered Leave Animations**
Use `animation-delay` to create sequential exit animations:
```html
@for (item of items; track item; let i = $index) {
  <div animate.leave="stagger-out" 
       [style.animation-delay]="(items.length - i - 1) * 0.1 + 's'">
    {{ item }}
  </div>
}
```

### 2. **Conditional Animation Classes**
Apply different animations based on context:
```html
<div [animate.leave]="isError ? 'error-exit' : 'normal-exit'">
  Content
</div>
```

### 3. **Sequence Animations**
Chain multiple elements leaving in sequence for dramatic effect.

## Animation Timing Functions

### Enter vs Leave Easing
- **Enter animations**: Use `ease-out` (fast start, slow end) - feels natural
- **Leave animations**: Use `ease-in` (slow start, fast end) - feels decisive

```css
.enter-animation {
  animation: slide-in 0.8s ease-out;
}

.leave-animation {
  animation: slide-out 0.4s ease-in;
}
```

## Accessibility Considerations

Always respect user preferences for reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  .enter-animation,
  .leave-animation {
    animation-duration: 0.01s !important;
  }
}
```

## Debugging Tips

1. **Use browser DevTools** to slow down animations and inspect timing
2. **Add background colors** to see exactly when elements appear/disappear
3. **Test with rapid toggling** to ensure animations don't conflict
4. **Check performance** on mobile devices

## Examples in This Project

### Basic Examples (`/open-close`)
- Simple enter/leave pairs with different animation types
- Demonstrates fundamental concepts
- Shows timing and easing differences

### Advanced Examples (`/advanced`)
- Staggered animations with different enter/leave patterns
- Dynamic animation selection
- Sequential animation demos
- Real-world usage patterns

## Common Pitfalls

1. **Making leave animations too long** - users expect quick exits
2. **Not considering animation conflicts** when rapidly toggling
3. **Forgetting about accessibility** - always handle `prefers-reduced-motion`
4. **Over-animating** - not every element needs elaborate animations

## Browser Support

`animate.enter` and `animate.leave` work in all modern browsers that support Angular. The underlying CSS animations have excellent browser support.