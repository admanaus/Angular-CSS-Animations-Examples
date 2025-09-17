import { Routes } from '@angular/router';
import { OpenClose } from './open-close/open-close';
import { AdvancedAnimations } from './advanced-animations/advanced-animations';

export const routes: Routes = [
    { path: 'open-close', component: OpenClose },
    { path: 'advanced', component: AdvancedAnimations },
    { path: '**', component: OpenClose },
];
