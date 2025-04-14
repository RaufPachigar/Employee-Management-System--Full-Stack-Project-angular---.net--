import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnInit {
  @Input() salary!: number;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.salary > 50000) {
      this.el.nativeElement.style.backgroundColor = '#edd4d6';
    }
  }
}
