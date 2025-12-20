import { Component } from '@angular/core';

import { JobFilterComponent } from "../job-filter/job-filter.component";
import { ApplyFormComponent } from "./apply-form/apply-form.component";

@Component({
  selector: 'app-apply',
  imports: [JobFilterComponent, ApplyFormComponent],
  templateUrl: './apply.component.html',
  styleUrl: './apply.component.scss'
})

export class ApplyComponent {

}
