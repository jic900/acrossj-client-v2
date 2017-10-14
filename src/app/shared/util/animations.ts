import {
  animate,
  AnimationTriggerMetadata,
  keyframes,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

// Component transition animations
export const slideInDownAnimation: AnimationTriggerMetadata = trigger('routeAnimation', [
  state('*',
    style({
      opacity: 1,
      transform: 'translateX(0)'
    })
  ),
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateX(-100%)'
    }),
    animate('0.3s ease-in')
  ]),
  transition(':leave', [
    animate('0.5s ease-out', style({
      opacity: 0,
      transform: 'translateX(100%)'
    }))
  ])
]);

/**
 * This animation fades in the background color and text content of the
 * mat-select's options. It is time delayed to occur 100ms after the overlay
 * panel has transformed in.
 */
export const fadeInContent: AnimationTriggerMetadata = trigger('fadeInContent', [
  state('showing', style({opacity: 1})),
  transition('void => showing', [
    style({opacity: 0}),
    animate(`150ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)`)
  ])
]);

export const slideCalendar: AnimationTriggerMetadata = trigger('slideCalendar', [
  transition('* => left', [
    animate(180, keyframes([
      style({opacity: 0, transform: 'translateX(100%)', offset: 0.5}),
      style({opacity: 0, transform: 'translateX(-100%)', offset: 0.51}),
      style({opacity: 1, transform: 'translateX(0)', offset: 1})
    ]))
  ]),
  transition('* => right', [
    animate(180, keyframes([
      style({opacity: 0, transform: 'translateX(-100%)', offset: 0.5}),
      style({opacity: 0, transform: 'translateX(100%)', offset: 0.51}),
      style({opacity: 1, transform: 'translateX(0)', offset: 1})
    ]))
  ]),
  transition('* => top', [
    animate(180, keyframes([
      style({opacity: 0, transform: 'translateY(100%)', offset: 0.5}),
      style({opacity: 0, transform: 'translateY(-100%)', offset: 0.51}),
      style({opacity: 1, transform: 'translateY(0)', offset: 1})
    ]))
  ]),
  transition('* => bottom', [
    animate(180, keyframes([
      style({opacity: 0, transform: 'translateY(-100%)', offset: 0.5}),
      style({opacity: 0, transform: 'translateY(100%)', offset: 0.51}),
      style({opacity: 1, transform: 'translateY(0)', offset: 1})
    ]))
  ])
]);
