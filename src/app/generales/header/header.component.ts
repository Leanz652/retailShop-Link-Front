import { UsersService } from './../../login/service/users.service';
import { EstaVisibleService } from './service/esta-visible.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class HeaderComponent implements OnInit {

  estaVisible: boolean;
  estaLogueado: boolean;
  esVendedor: boolean;

  constructor( private estaVisibleService: EstaVisibleService, router: Router, private usersService : UsersService ) {

    this.estaVisible = false;
    this.estaLogueado = false;
    this.esVendedor = false;
   }

  ngOnInit(): void {

    this.estaVisibleService.cambioDeVisibilidad.subscribe((valor : boolean) => {
      this.estaVisible = valor;
    })

    this.estaLogueado = this.usersService.estaLoggeado();
    this.esVendedor = this.usersService.esVendedor();

    this.usersService.loggeo.subscribe(
      (estoyLoggeado: boolean) => {
        this.estaLogueado = estoyLoggeado;
        this.esVendedor = this.usersService.esVendedor();
      }
      );

  }


  logout() {
    this.usersService.logOut();
  }

}
