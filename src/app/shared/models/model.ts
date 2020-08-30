
export interface iAppUser {
    name: String;
    email: string;
    isAdmin: boolean;
}

export interface IProduct {
    key: string;
    title: String;
    imgUrl: string;
    price: number;
    category: string;
}

export class IShoppingCartItem {
    $key: string;
    title: string;
    price: number;
    quantity: number;
    imageUrl: string;

    constructor(init? :Partial<IShoppingCartItem>) {
        Object.assign(this, init)
    }

    get totalPrice() {
        return (this.price && this.quantity) ? this.price * this.quantity : 0;
    }
}

export class IShoppingCart {
    items: IShoppingCartItem[] = [];
    constructor(private itemsMap: { [key: string]: IShoppingCartItem }) {
        this.itemsMap = itemsMap || {};
        for (let item in this.itemsMap) {
            const customItem = new IShoppingCartItem({
                ...itemsMap[item],
                $key:item
             });
            this.items.push(customItem);
        }
    }


    get totalItems() {
        let count = 0;
        for (let item in this.itemsMap) {
            count += this.itemsMap[item].quantity;
        }
        return count;
    }

    get totalPrice() {
        let sum = 0;
        for (let item of this.items) {
            sum += item.totalPrice;
        }
        return sum;
    }

    public getQuantity(product) {
        const productInCart =  this.itemsMap[product.$key];
        return productInCart ? productInCart.quantity  : 0;
    }
}

export interface IUserDetails{
    name: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
}