import { Component, signal } from '@angular/core';

interface SequenceStep {
  id: number;
  visible: boolean;
}

@Component({
  selector: 'app-advanced-animations',
  imports: [],
  templateUrl: './advanced-animations.html',
  styleUrl: './advanced-animations.css'
})
export class AdvancedAnimations {
  showCards = signal(false);
  items = signal(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']);
  
  // Track items that are being removed to trigger leave animations
  removingItems = signal(new Set<number>());
  
  // Sequence animation properties
  sequenceRunning = signal(false);
  sequenceSteps = signal<SequenceStep[]>([
    { id: 1, visible: false },
    { id: 2, visible: false },
    { id: 3, visible: false },
    { id: 4, visible: false },
    { id: 5, visible: false }
  ]);

  // Animation event handlers for debugging
  onAnimationStart(event: AnimationEvent, itemIndex: number, itemText: string) {
    // Animation started
  }

  onAnimationEnd(event: AnimationEvent, itemIndex: number, itemText: string) {
    // Animation ended
  }

  onTransitionStart(event: TransitionEvent, itemIndex: number, itemText: string) {
    // Transition started
  }

  onTransitionEnd(event: TransitionEvent, itemIndex: number, itemText: string) {
    // Transition ended
  }

  toggleCards() {
    this.showCards.update(show => !show);
  }

  removeItem(index: number) {
    // Step 1: Mark item as being removed (triggers leave animation)
    this.removingItems.update(removing => {
      const newSet = new Set(removing);
      newSet.add(index);
      return newSet;
    });
    
    // Step 2: Wait for leave animation to complete, then actually remove from items array
    setTimeout(() => {
      this.items.update(items => {
        const newItems = items.filter((_, i) => i !== index);
        return newItems;
      });
      
      // Step 3: Clear ALL removal markers since indices have shifted
      this.removingItems.update(removing => {
        const newSet = new Set<number>();
        return newSet;
      });
    }, 600); // Give time for leave animation to complete
  }

  getEnterAnimation(index: number): string {
    const animations = ['slide-enter', 'fade-enter', 'bounce-enter', 'scale-enter'];
    return animations[index % animations.length];
  }

  getLeaveAnimation(index: number): string {
    const animations = ['slide-leave', 'fade-leave', 'bounce-leave', 'scale-leave'];
    return animations[index % animations.length];
  }

  async triggerSequence() {
    if (this.sequenceRunning()) return;
    
    this.sequenceRunning.set(true);
    
    // Reset all steps
    this.sequenceSteps.update(steps => 
      steps.map(step => ({ ...step, visible: false }))
    );

    // Show steps one by one
    for (let i = 0; i < this.sequenceSteps().length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      this.sequenceSteps.update(steps => 
        steps.map((step, index) => 
          index === i ? { ...step, visible: true } : step
        )
      );
    }

    // Wait a bit, then hide them in reverse order
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    for (let i = this.sequenceSteps().length - 1; i >= 0; i--) {
      await new Promise(resolve => setTimeout(resolve, 300));
      this.sequenceSteps.update(steps => 
        steps.map((step, index) => 
          index === i ? { ...step, visible: false } : step
        )
      );
    }

    this.sequenceRunning.set(false);
  }
}