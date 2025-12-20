import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-borders',
  imports: [CommonModule],
  templateUrl: './borders.component.html',
  styleUrl: './borders.component.scss'
})

export class BordersComponent {

  @Input() title: string;
  @Input() class: string = '';
  @Input() details: { class?: string, color?: string; position?: string; title?: string}[];
  @Input() color: boolean = false;
  @Input() text: boolean = false;
  @Input() backgroundColor: boolean = false;
  @Input() helperText: string = 'border';
  
}
