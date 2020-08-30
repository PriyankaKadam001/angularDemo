import { IShoppingCart } from '../shared/models/model';

export class Order{
    dateCreated: number;
    items = [];

    constructor(shoppingCart: IShoppingCart, public shipping:any, private userId: string){
        this.dateCreated = new Date().getTime();

        this.items = shoppingCart.items.map((item) => {
            return {
              product: {
                title: item.title,
                imageUrl: item.imageUrl,
                price: item.price
              },
    
              quantity: item.quantity,
              totalPrice: shoppingCart.totalPrice,
              user: this.userId        
          }})

    }
}