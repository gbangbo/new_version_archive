import { Component } from '@angular/core';
import { Select2Module } from 'ng-select2-component';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { FeatherIconComponent } from "../../../../shared/components/ui/feather-icon/feather-icon.component";
import { languages } from '../../../../shared/data/user';

@Component({
  selector: 'app-user-setting',
  imports: [Select2Module, CardComponent, FeatherIconComponent],
  templateUrl: './user-setting.component.html',
  styleUrl: './user-setting.component.scss'
})

export class UserSettingComponent {

  public languages = languages;

}
