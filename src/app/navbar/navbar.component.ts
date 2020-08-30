import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { iAppUser } from '../shared/models/model';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
appUser: iAppUser;
aggregateCart;
cart$;

  constructor(public authService: AuthService, private shoppingCart: ShoppingCartService) {
   authService.getAppUser().subscribe(appUser => {
     this.appUser = appUser;
    });
   }

  async ngOnInit() {
   this.cart$ = await (await this.shoppingCart.getCart());
  }

  cleanUp(){
    this.authService.logout();
  }

}
