import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { FeatherIconComponent } from "../../../shared/components/ui/feather-icon/feather-icon.component";

@Component({
  selector: 'app-knowledge-base-top-data',
  imports: [CommonModule, FeatherIconComponent],
  templateUrl: './knowledge-base-top-data.component.html',
  styleUrl: './knowledge-base-top-data.component.scss'
})

export class KnowledgeBaseTopDataComponent {

}
