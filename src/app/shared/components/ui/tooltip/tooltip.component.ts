import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  imports: [],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss'
})
export class TooltipComponent {

  @Input() title: string;
  @Input() direction: string = 'top';
  @Input() template: boolean = false;

}
