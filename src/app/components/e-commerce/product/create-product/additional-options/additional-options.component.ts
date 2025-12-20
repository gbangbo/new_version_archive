import { Component, EventEmitter, Input, Output } from '@angular/core';

import { InventoryComponent } from "./inventory/inventory.component";
import { PublishComponent } from "./publish/publish.component";
import { SeoTagsComponent } from "./seo-tags/seo-tags.component";
import { ShippingComponent } from "./shipping/shipping.component";
import { VariationsComponent } from "./variations/variations.component";
import { additionalOptions } from '../../../../../shared/data/product';

@Component({
  selector: 'app-additional-options',
  imports: [InventoryComponent, SeoTagsComponent,
            ShippingComponent, VariationsComponent, PublishComponent],
  templateUrl: './additional-options.component.html',
  styleUrl: './additional-options.component.scss'
})

export class AdditionalOptionsComponent {
 
  @Output() changeTab = new EventEmitter<number>();

  @Input() active: number;
  
  public activeTab: string = 'inventory';
  public additionalOptions = additionalOptions;
  public additionalActiveId: number = 1;

  changeTabDetails(value: number) {
    this.additionalActiveId = value   
  
    if(this.additionalActiveId) {
      const tab = this.additionalOptions.find(tab => tab.id == this.additionalActiveId)
      
      if(tab) {
        this.activeTab = tab.value;
      }
    }
  }
  
  handleTab(value: string) {
    this.activeTab = value;
  }

  handleChangeTab(value: number){
    this.changeTab.emit(value)
  }

}
