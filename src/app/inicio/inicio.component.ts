import { UsersService } from './../login/service/users.service';
import { DataService } from './../data.service';
import { EstaVisibleService } from './../generales/header/service/esta-visible.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  publicaciones : any[] = [];
  esVendedor: boolean = false;

  constructor(private estaVisibleService: EstaVisibleService,
    private dataService : DataService,
    private userService: UsersService) {
    }

  ngOnInit(): void {
  this.estaVisibleService.hacerVisibleHeader();

  this.dataService.getProductos().subscribe((productos : any) => {
  this.publicaciones = productos._embedded.productoes;
  this.esVendedor = this.userService.esVendedor();
  console.log(this.publicaciones);
  })
}

}
