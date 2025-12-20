import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { TableComponent } from '../../../../../shared/components/ui/table/table.component';
import { topMentors } from '../../../../../shared/data/dashboard/online-course';
import { TopMentors } from '../../../../../shared/interface/dashboard/online-course';
import { cardToggleOptions3 } from '../../../../../shared/data/common';
import { TableConfigs } from '../../../../../shared/interface/common';

@Component({
  selector: 'app-top-mentors',
  imports: [CardComponent, TableComponent],
  templateUrl: './top-mentors.component.html',
  styleUrl: './top-mentors.component.scss'
})
export class TopMentorsComponent {

  public cardToggleOptions = cardToggleOptions3;

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Mentor Name', field_value: 'mentor_name', sort: true },
      { title: 'Expertise', field_value: 'expertise', sort: true },
      { title: 'Courses', field_value: 'courses', sort: true },
      { title: 'Experience', field_value: 'experience', sort: true, text: 'Year' },
    ],
    data: [] as TopMentors[]
  };

  constructor(private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    (window as any)['navigateToMentor'] = () => {
      this.router.navigate(['/courses/courses-list']);
    };

    this.tableConfig.data = topMentors.map((mentor: TopMentors) => {
      const formattedMentor = { ...mentor };
      formattedMentor.mentor_name = this.sanitizer.bypassSecurityTrustHtml(`<div class="common-flex items-center">
                                  <img class="max-w-full rounded-full" src="${mentor.mentor_profile}" alt="user">
                                  <a class="font-medium" href="javascript:void(0)" onclick="navigateToMentor()">${mentor.mentor_name}</a>
                                </div>`);
                                
      return formattedMentor;
    });
  }

}
