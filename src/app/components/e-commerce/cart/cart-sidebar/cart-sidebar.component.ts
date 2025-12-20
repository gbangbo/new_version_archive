import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { CartService } from '../../../../shared/services/cart.service';

@Component({
  selector: 'app-cart-sidebar',
  imports: [RouterModule, CardComponent],
  templateUrl: './cart-sidebar.component.html',
  styleUrl: './cart-sidebar.component.scss'
})

export class CartSidebarComponent {

  constructor(public cartService: CartService) {}

}
