import { Component, Input } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { FeatherIconComponent } from "../../../../../shared/components/ui/feather-icon/feather-icon.component";
import { ActivityPanel } from '../../../../../shared/interface/dashboard/nft';

@Component({
  selector: 'app-activity-panel',
  imports: [CardComponent, FeatherIconComponent],
  templateUrl: './activity-panel.component.html',
  styleUrl: './activity-panel.component.scss'
})

export class ActivityPanelComponent {

  @Input() activity: ActivityPanel;

}
