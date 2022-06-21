import { UsersService } from './../login/service/users.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicarGuard implements CanActivate {

  constructor(private userService: UsersService,
    private router: Router) { };

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      if (!this.userService.estaLoggeado()){
        alert("Debes loggearte primero para publicar");
        return this.router.navigate(['login'], {queryParams: {'redirectURL': state.url}});
      }

      if (!this.userService.esVendedor()) {
        alert("Solo los vendedores pueden ingresar");
        return this.router.navigateByUrl("/");
      }

      return true;
  }

}
