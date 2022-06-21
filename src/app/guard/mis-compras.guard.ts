import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../login/service/users.service';

@Injectable({
  providedIn: 'root'
})
export class MisComprasGuard implements CanActivate {
  constructor(private userService: UsersService,
    private router: Router) { };

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      if (!this.userService.estaLoggeado()){
        alert("Debes loggearte primero para publicar");
        return this.router.navigateByUrl("/login");
      }

      if (this.userService.esVendedor()) {
        alert("Solo los clientes tiene sus compras");
        return this.router.navigateByUrl("/");
      }

      return true;
  }

}
