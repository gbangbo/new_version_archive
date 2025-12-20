import { Component, EventEmitter, Output } from '@angular/core';

import { myProfile, socialAppTab } from '../../../../shared/data/social-app';

@Component({
  selector: 'app-social-app-profile',
  imports: [],
  templateUrl: './social-app-profile.component.html',
  styleUrl: './social-app-profile.component.scss'
})

export class SocialAppProfileComponent {

  @Output() currentTab = new EventEmitter();

  public socialAppTab = socialAppTab;
  public myProfile = myProfile;
  public userProfile = { ...myProfile };
  
  public activeTab: string = 'timeline';

  ngOnInit() {
    this.currentTab.emit(this.activeTab);
  }

  handleActiveTab(value: string) {
    this.activeTab = value;
    this.currentTab.emit(this.activeTab);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.userProfile.profile = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeProfile() {
    this.userProfile.profile = 'assets/images/forms/user2.png';
  }
  
}
