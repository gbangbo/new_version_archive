import { Component, EventEmitter, Output } from '@angular/core';
 
import { SvgIconComponent } from "../../../../shared/components/ui/svg-icon/svg-icon.component";
import { emailTypes } from '../../../../shared/data/email';
import { OutsideDirective } from '../../../../shared/directives/outside.directive';
         
@Component({
  selector: 'app-mail-header',
  imports: [OutsideDirective, SvgIconComponent],
  templateUrl: './mail-header.component.html',
  styleUrl: './mail-header.component.scss'
})

export class MailHeaderComponent {

  @Output() emailType = new EventEmitter<string>();

  public emailTypes = emailTypes;
  public activeType: string = 'important';
  public dropdownOpen: boolean = false;

  ngOnInit() {
    this.emailType.emit(this.activeType);
  }

  handleType(value: string) {
    this.activeType = value;
    this.emailType.emit(this.activeType);
  }
  
  toggleDropdown() {
    this.dropdownOpen =! this.dropdownOpen;
  }

  clickOutside(): void {
    this.dropdownOpen = false;
  }

}
