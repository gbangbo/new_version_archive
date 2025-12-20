import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-social-media-announcement',
  imports: [RouterModule, CardComponent],
  templateUrl: './social-media-announcement.component.html',
  styleUrl: './social-media-announcement.component.scss'
})

export class SocialMediaAnnouncementComponent {

}
