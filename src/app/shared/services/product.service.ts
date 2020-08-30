import { Injectable } from '@angular/core';
import { AngularFireDatabase }  from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) { }

  create(product){
    this.db.list('/products').push(product);
  }
  getAll(){
    return this.db.list('/products').snapshotChanges().pipe(map(items => {          // <== new way of chaining
      return items.map(a => {
        const data = a.payload.val();
        const key = a.payload.key;
        return {key, data};           // or {key, ...data} in case data is Obj
      });
    }));
  }
  get(productId){
    return this.db.object('/products/'+productId);
  }

  update(id, product){
    return this.db.object('/products/'+id).update(product);
  }

  delete(id){
    return this.db.object('/products/'+id).remove();
  }
}
