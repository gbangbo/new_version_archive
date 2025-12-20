import { Component, Input } from '@angular/core';

import { FeatherIconComponent } from "../../../../shared/components/ui/feather-icon/feather-icon.component";
import { KnowledgeBase } from '../../../../shared/interface/knowledge-base';

@Component({
  selector: 'app-common-faq-details',
  imports: [FeatherIconComponent],
  templateUrl: './common-faq-details.component.html',
  styleUrl: './common-faq-details.component.scss'
})

export class CommonFaqDetailsComponent {
  
  @Input() details: KnowledgeBase;

}
