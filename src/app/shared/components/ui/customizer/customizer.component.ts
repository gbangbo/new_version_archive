import { Component } from '@angular/core';

import { SettingCustomizerComponent } from "./setting-customizer/setting-customizer.component";
import { LayoutCustomizerComponent } from "./layout-customizer/layout-customizer.component";

@Component({
  selector: 'app-customizer',
  imports: [SettingCustomizerComponent, LayoutCustomizerComponent],
  templateUrl: './customizer.component.html',
  styleUrl: './customizer.component.scss'
})

export class CustomizerComponent {

  public customizer: { layout: boolean; setting: boolean } = {
    layout: false,
    setting: false
  };
  
  open(value: keyof typeof this.customizer) {
    this.customizer[value] = true;
  }

  openLayout() {
    this.customizer.layout = true
  }

  handleCustomizer(value: boolean) {
    this.customizer.setting = value;
  }

  handleLayout(value: boolean) {
    this.customizer.layout = value;
  }
  
}
