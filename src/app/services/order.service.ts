import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order) {
    const PlacedOrder = await this.db.list('/order').push(order);
    this.shoppingCartService.clearCart();
    return PlacedOrder;
  }

   getOrder(){
    const orderSub =  this.db.list('/order').snapshotChanges().pipe(map((result) =>{
      const orders = result.map(element => {
        return {
          data: element.payload.val(),
          key: element.key
        }
      });
      return orders
    }
    ));
    return orderSub;
  }
}
