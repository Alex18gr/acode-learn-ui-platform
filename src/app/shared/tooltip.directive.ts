import { Directive, ElementRef, Input } from '@angular/core';
import Tooltip from 'tooltip.js';
import { Placement } from 'popper.js';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective {
  @Input() tooltipText = '';
  @Input() placement = 'top';
  myTooltip: any;

  constructor(private element: ElementRef) {
    this.myTooltip = new Tooltip(element.nativeElement as HTMLElement, {
      // @ts-ignore
      placement: this.placement,
      title: this.tooltipText,
      trigger: 'hover',
    });
  }
}
