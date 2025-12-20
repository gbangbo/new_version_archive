import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { TableComponent } from '../../../../../shared/components/ui/table/table.component';
import { creators } from '../../../../../shared/data/dashboard/nft';
import { Creator } from '../../../../../shared/interface/dashboard/nft';
import { cardToggleOptions1 } from '../../../../../shared/data/common';
import { TableConfigs } from '../../../../../shared/interface/common';

@Component({
  selector: 'app-creators',
  imports: [CardComponent, TableComponent],
  templateUrl: './creators.component.html',
  styleUrl: './creators.component.scss'
})

export class CreatorsComponent {

  public creators: Creator[];
  public cardToggleOptions = cardToggleOptions1;

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Creator Name', field_value: 'creator_name', sort: true },
      { title: 'Creations', field_value: 'creations', sort: true, },
      { title: 'Followers', field_value: 'followers', sort: true },
    ],
    data: [] as Creator[]
  };

  constructor(private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    (window as any)['navigateToCreator'] = () => {
      this.router.navigate(['/social-app']);
    };

    this.tableConfig.data = this.formatCreatorDetails(creators);
    this.creators = creators;
  }

  private formatCreatorDetails(creators: Creator[]) {
    return creators.map((creator: Creator) => {
      const formattedCreator = { ...creator };
      formattedCreator.creator_name = this.sanitizer.bypassSecurityTrustHtml(`<div class="flex">
                                        <img class="max-w-full rounded-full me-2" src="${creator.creator_profile}" alt="user">
                                          <div class="img-content-box">
                                            <a class="font-medium" href="javascript:void(0)" onclick="navigateToCreator()">${creator.creator_name}</a>
                                            <p class="mb-0 f-light">${creator.category}</p>
                                          </div>
                                        </div>`);
                                        
      return formattedCreator;
    });
  }
}
