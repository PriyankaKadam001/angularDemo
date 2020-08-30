import { Router, ActivatedRoute } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable} from 'rxjs';
import { UserService } from 'shared/services/user.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  constructor(public afAuth: AngularFireAuth, public router: Router, private route: ActivatedRoute, private userService: UserService) {
    this.user$ = this.afAuth.authState;
  }
  async login(email: string, password: string) {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    await this.afAuth.signInWithEmailAndPassword(email, password).then((res) => {
      this.userService.save(this.user$);
      this.router.navigateByUrl(returnUrl);
    })

  }
  async logout() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  getAppUser() {
    const test =  this.user$.pipe(switchMap(user => {
      return this.userService.get(user.uid).valueChanges()
    }));
    return test;
  }
}
