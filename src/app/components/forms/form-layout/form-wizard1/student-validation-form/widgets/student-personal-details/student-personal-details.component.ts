import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-personal-details',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './student-personal-details.component.html',
  styleUrl: './student-personal-details.component.scss'
})

export class StudentPersonalDetailsComponent {

}
