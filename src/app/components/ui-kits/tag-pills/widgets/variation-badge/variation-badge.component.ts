import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { FeatherIconComponent } from "../../../../../shared/components/ui/feather-icon/feather-icon.component";

@Component({
  selector: 'app-variation-badge',
  imports: [CommonModule, FeatherIconComponent],
  templateUrl: './variation-badge.component.html',
  styleUrl: './variation-badge.component.scss'
})

export class VariationBadgeComponent {

  @Input() badgeDetails: { color: string }[];
  @Input() type: string = '';
  @Input() rounded: boolean = false;
  @Input() badgeIcons: { icon: string }[];

}
