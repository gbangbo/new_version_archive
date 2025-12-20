import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxPrintModule } from 'ngx-print';

import { FeatherIconComponent } from '../../../../shared/components/ui/feather-icon/feather-icon.component';
import { SvgIconComponent } from "../../../../shared/components/ui/svg-icon/svg-icon.component";
import { Emails } from '../../../../shared/interface/email';
import { TooltipComponent } from "../../../../shared/components/ui/tooltip/tooltip.component";
import { OutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-mail-details',
  imports: [AngularEditorModule, NgxPrintModule, OutsideDirective, 
            SvgIconComponent, FeatherIconComponent, TooltipComponent],
  templateUrl: './mail-details.component.html',
  styleUrl: './mail-details.component.scss'
})

export class MailDetailsComponent {

  @Output() isMailOpen = new EventEmitter<boolean>();

  @Input() mailDetails: Emails;

  public dropdownOpen: boolean = false;

  getUserText(userName: string): string {
    let names = userName.split(' ');
    return names.map(name => name[0]).join('');
  }

  getTextColor(name: string) {
    let firstLetter = name[0];

    if(firstLetter >= 'A' && firstLetter <= 'M') {
      return 'primary'
    } else {
      return 'success'
    }
  }

  goPrevious() {
    this.isMailOpen.emit(false);
  }

  addToFavorite(email: Emails) {
    email.is_favorite =! email.is_favorite;
  }
  
  print() {
    window.print()
  }

  toggleDropdown() {
    this.dropdownOpen =! this.dropdownOpen;
  }

  clickOutside(): void {
    this.dropdownOpen = false;
  }

}
