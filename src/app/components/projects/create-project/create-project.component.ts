import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select2Data, Select2Module } from 'ng-select2-component';

import { projectCategory, projectPriority, projectSize, projectType } from '../../../shared/data/project';

@Component({
  selector: 'app-create-project',
  imports: [CommonModule, Select2Module, FormsModule, ReactiveFormsModule],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss'
})

export class CreateProjectComponent {

  public selectedTeamMember = ['nathan_cooper', 'zoey_jenkins'];
  public projectType = projectType;
  public projectCategory = projectCategory;
  public projectPriority = projectPriority;
  public projectSize = projectSize;

  public details: Select2Data = [
    {
        id: '1',
        value: 'nathan_cooper',
        label: 'Nathan Cooper',
    },
    {
        id: '2',
        value: 'owen_davis',
        label: 'Owen Davis',
    },
    {
        id: '3',
        value: 'zoey_jenkins',
        label: 'Zoey Jenkins',
    },
    {
        id: '4',
        value: 'alexis_taylor',
        label: 'Alexis Taylor',
    },
    {
        id: '5',
        value: 'leonel_hodges',
        label: 'Leonel Hodges',
    },
    {
        id: '6',
        value: 'emelia_green',
        label: 'Emelia Green',
    }
];

  public projectForm = new FormGroup({
    projectName: new FormControl('', Validators.required),
    clientName: new FormControl('', Validators.required),
    cost: new FormControl('', Validators.required),
    projectType: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    priority: new FormControl('', Validators.required),
    teamLeader: new FormControl('', Validators.required),
    teamMember: new FormControl([], Validators.required),
    size: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    details: new FormControl('', Validators.required),
    document: new FormControl('', Validators.required),
  });

  submitForm() {
    this.projectForm.markAllAsTouched();

    if(this.projectForm.valid) {
      window.location.reload();
    }
  }
  
}
