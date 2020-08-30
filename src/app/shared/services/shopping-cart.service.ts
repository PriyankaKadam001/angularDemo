import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { take, map } from 'rxjs/operators';
import { IShoppingCart } from 'shared/models/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }



  private async getRefOfCart(): Promise<string> {
    let cardId = localStorage.getItem('cartId');
    if (cardId)
      return cardId;
    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;

  }

  private getCartItem(cartId: string, product: any) {
    return this.db.object('/shopping-cart/' + cartId + '/items/' + product.$key);
  }

  private async updateCart(product, changeFactor) {
    const cartId = await this.getRefOfCart();
    let $item = this.getCartItem(cartId, product);
    $item.snapshotChanges().pipe(take(1)).subscribe((item) => {
      let currentProduct = item.payload.val();
      const quantity = ((currentProduct && currentProduct['quantity']) || 0) + changeFactor;
      quantity == 0 ? $item.remove() : $item.update({
        quantity: quantity,
        title: product.title,
        price: product.price,
        imageUrl: product.imageUrl
      });
    })
  }

  public async addToCart(product) {
    this.updateCart(product, 1);
  }

  public async removeFromCart(product) {
    this.updateCart(product, -1);
  }

  create() {
    return this.db.list('/shopping-cart').push({
      dateCreated: new Date().getTime()
    });
  }
  async getCart(): Promise<Observable<IShoppingCart>> {
    const cartId = await this.getRefOfCart();
    return this.db.object('/shopping-cart/' + cartId).snapshotChanges().pipe(map((result) => {
      if (result.payload.val()) {
        return new IShoppingCart(result.payload.val()['items']);
      }
    }));
  }

  public async clearCart() {
    const cartId = await this.getRefOfCart();    
    this.db.object('/shopping-cart/' + cartId+'/items').remove();
  }
}
