import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

export const expandCollapse = trigger('expandCollapse', [
  state('collapsed', style({
    height: '0px',
    opacity: 0,
    overflow: 'hidden'
  })),
  state('expanded', style({
    height: '*',
    opacity: 1,
    overflow: 'hidden'
  })),
  transition('collapsed <=> expanded', [
    animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')
  ])
])
export const iconRotate = trigger('iconRotate', [
  state('default', style({
    transform: 'rotate(0deg)'
  })),
  state('rotated', style({
    transform: 'rotate(180deg)'
  })),
  transition('default <=> rotated', [
    animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')
  ])
])
export const fadeInUp = trigger('fadeInUp', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateY(20px)'
    }),
    animate('400ms ease-out', style({
      opacity: 1,
      transform: 'translateY(0)'
    }))
  ])
])

export const slideIn = trigger('slideIn', [
  state('void', style({ transform: 'translateX(100%)' })),

  state('*', style({ transform: 'translateX(0%)' })),

  transition(':enter', [
    style({ transform: 'translateX(100%)' }), 
    animate('0.3s ease-out', style({ transform: 'translateX(0%)' })) 
  ]),
  transition(':leave', [
    animate('0.3s ease-in', style({ transform: 'translateX(100%)' }))
  ])
]);
export const fadeIn = trigger('fadeIn', [
  state('void', style({ opacity: 0 })),
  transition(':enter', [
    animate('0.3s ease-out', style({ opacity: 1 }))
  ]),
  transition(':leave', [
    animate('0.3s ease-out', style({ opacity: 0 }))
  ])
]);