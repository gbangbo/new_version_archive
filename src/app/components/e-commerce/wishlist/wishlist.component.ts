import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardComponent } from "../../../shared/components/ui/card/card.component";
import { WishlistService } from '../../../shared/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  imports: [CommonModule, RouterModule, CardComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})

export class WishlistComponent {

  constructor(public wishlistService: WishlistService) {}

}
