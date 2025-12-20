import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { AddProfileComponent } from "./widgets/add-profile/add-profile.component";
import { SocialLinksComponent } from "./widgets/social-links/social-links.component";
import { StudentPersonalDetailsComponent } from "./widgets/student-personal-details/student-personal-details.component";

@Component({
  selector: 'app-student-validation-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
            StudentPersonalDetailsComponent, AddProfileComponent, SocialLinksComponent,
            CardComponent],
  templateUrl: './student-validation-form.component.html',
  styleUrl: './student-validation-form.component.scss'
})

export class StudentValidationFormComponent {

  public activeTab: number = 1;

  handleStep(value: number) {
    if(value == -1) {
      this.activeTab = this.activeTab - 1;
    } else if(value == 1 && this.activeTab < 3) {
      this.activeTab = this.activeTab + 1;
    }
  }

}
