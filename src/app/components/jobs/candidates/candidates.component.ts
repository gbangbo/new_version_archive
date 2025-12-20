import { Component } from '@angular/core';

import { CardComponent } from "../../../shared/components/ui/card/card.component";
import { TableComponent } from "../../../shared/components/ui/table/table.component";
import { CandidateFilterComponent } from "./candidate-filter/candidate-filter.component";
import { candidateList } from '../../../shared/data/jobs/candidates';
import { Candidate } from '../../../shared/interface/jobs';
import { TableConfigs } from '../../../shared/interface/common';

@Component({
  selector: 'app-candidates',
  imports: [CandidateFilterComponent, CardComponent, TableComponent],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.scss'
})

export class CandidatesComponent {

  public candidateList = candidateList;
  public selected: number[] = [];

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Candidate Name', field_value: 'name', sort: true },
      { title: 'Description', field_value: 'designation', sort: true },
      { title: 'Educations', field_value: 'education', sort: true, },
      { title: 'Experience & Skills', field_value: 'experience', sort: true, },
    ],
    row_action: [
      { label: "Message" },
      { label: "Approve" },
      { label: "Reject" }
    ],
    data: [] as Candidate[]
  };

  ngOnInit() {
    this.tableConfig.data = candidateList.map((candidate: Candidate) => {
      const formattedCandidate = { ...candidate };
      formattedCandidate.name = `<div class="common-flex items-center">
                                            <div class="relative">
                                                <img class="max-w-full rounded-full" src="${candidate.img}" alt="user">
                                                <div class="status">
                                                    <div class="inner-dot bg-${candidate.class}"></div>
                                                </div>
                                            </div>
                                            <div><a class="font-medium" href="javascript:void(0)">${candidate.name}</a>
                                                <p>${candidate.label}</p>
                                            </div>
                                        </div>
                                        <div class="common-f-start">
                                            <div class="attachment">
                                                <i class="fa-solid fa-paperclip"></i>
                                                <span>${candidate.projects} Projects</span>
                                            </div>
                                        </div>`;

      formattedCandidate.designation = `<ul class="candidate-desc">
                                            <li>
                                                <h6>${candidate.designation}</h6>
                                            </li>
                                            <li>
                                                <h6 class="c-light">Salary Range: <span class="f-14">${candidate.salary}</span>
                                                </h6>
                                            </li>
                                        </ul>`;
      let educationHtml = '';
      for (let i = 0; i < candidate.education.length; i++) {
        for (const degree in candidate.education[i]) {
          educationHtml += `<p class="mb-0">${candidate.education[i][degree]}</p>`;
        }
      }
      
      formattedCandidate.education = educationHtml;

      let skillHtml = '';
      for (let i = 0; i < candidate.skills.length; i++) {
        skillHtml += ` <span class="badge badge-light-${candidate.skills[i]['class']}">
                                                          ${candidate.skills[i]['name']} </span>`;
      }

      formattedCandidate.experience = `<ul class="candidate-skill">
                                            <li>
                                                <p class="mb-4">Experience : <span>${candidate.experience}</span></p>
                                            </li>
                                            <li>
                                             <div class="common-flex">
                                               ${skillHtml}
                                               </div
                                            </li>
                                        </ul>`;

      return formattedCandidate;
    })
  }
}
