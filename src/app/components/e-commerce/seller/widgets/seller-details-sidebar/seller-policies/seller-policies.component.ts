import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { sellerDetails } from '../../../../../../shared/data/store';

@Component({
  selector: 'app-seller-policies',
  imports: [AngularEditorModule, FormsModule],
  templateUrl: './seller-policies.component.html',
  styleUrl: './seller-policies.component.scss'
})

export class SellerPoliciesComponent {

  public policy = sellerDetails.policies;

}
