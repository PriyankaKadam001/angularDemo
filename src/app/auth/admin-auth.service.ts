import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }
  canActivate():  Observable<boolean> {
    return this.auth.getAppUser()
        .pipe(map(appUser=> appUser.isAdmin));
   }
}
