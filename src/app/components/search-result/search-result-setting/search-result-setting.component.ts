import { Component } from '@angular/core';
import { Select2Module } from 'ng-select2-component';

import { languages, regions, fileFormats, lastUpdate, licenseOptions } from '../../../shared/data/search-result';

@Component({
  selector: 'app-search-result-setting',
  imports: [Select2Module],
  templateUrl: './search-result-setting.component.html',
  styleUrl: './search-result-setting.component.scss'
})

export class SearchResultSettingComponent {

  public languages = languages;
  public regions = regions;
  public fileFormats = fileFormats;
  public lastUpdate = lastUpdate;
  public licenseOptions = licenseOptions;

}
