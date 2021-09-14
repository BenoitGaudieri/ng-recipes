import { Directive, ViewContainerRef } from '@angular/core';

// This is for the dynamic alert component
@Directive({
  selector: '[appPlaceholder]',
})
export class PlaceholderDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
