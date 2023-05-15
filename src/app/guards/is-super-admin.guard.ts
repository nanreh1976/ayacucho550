import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IsSuperAdminGuard implements CanActivate {
  user = JSON.parse(localStorage.getItem('usuario') || `{}`);

  userLoggedEsSuperAdmin = this.user.roles.superAdmin;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.userLoggedEsSuperAdmin) {
      return true;
    } else {
     // console.log('No tiene permiso para ver esta pagina');
      return false;
    }
  }
}
