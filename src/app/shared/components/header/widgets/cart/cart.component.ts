import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FeatherIconComponent } from "../../../ui/feather-icon/feather-icon.component";
import { SvgIconComponent } from "../../../ui/svg-icon/svg-icon.component";
import { CartService } from '../../../../services/cart.service';

@Component({
  selector: 'app-header-cart',
  imports: [CommonModule, RouterModule, SvgIconComponent, FeatherIconComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})

export class CartComponent {

  constructor(public cartService: CartService) {}

}
