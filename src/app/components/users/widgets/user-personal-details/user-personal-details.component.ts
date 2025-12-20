import { Component, Input } from '@angular/core';

import { TooltipComponent } from "../../../../shared/components/ui/tooltip/tooltip.component";
import { socialShareOptions } from '../../../../shared/data/product';
import { Users } from '../../../../shared/interface/user';

@Component({
  selector: 'app-user-personal-details',
  imports: [TooltipComponent],
  templateUrl: './user-personal-details.component.html',
  styleUrl: './user-personal-details.component.scss'
})

export class UserPersonalDetailsComponent {

  @Input() currentUser: Users;

  public socialShareOptions = socialShareOptions;
  public user: Users;

  ngOnChanges() {
    this.user = { ...this.currentUser }
  }
  
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.user.user_profile = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeProfile() {
    this.user.user_profile = 'assets/images/forms/user2.png';
  }

}
