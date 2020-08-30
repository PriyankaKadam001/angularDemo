import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireObject }  from '@angular/fire/database';
import { Observable } from 'rxjs';
import { iAppUser } from 'shared/models/model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user$: Observable<firebase.User>){
    user$.subscribe((user)=> {
      if(user){
        this.db.object('/users/'+user.uid).update({
          name: user.displayName,
          email: user.email
        });
      } 
    })       
  }

  get(uid: string): AngularFireObject<iAppUser>{
    return this.db.object('/users/'+ uid);
  }
}
