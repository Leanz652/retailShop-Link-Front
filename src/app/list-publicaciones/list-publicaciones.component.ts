


import { UsersService } from './../login/service/users.service';
import { DataService } from './../data.service';
import { EstaVisibleService } from './../generales/header/service/esta-visible.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';


@Component({
  templateUrl: './list-publicaciones.component.html',
  styleUrls: ['./list-publicaciones.component.css']
})
export class ListPublicacionesComponent implements OnInit {

  publicaciones : any[] = [];
  esVendedor: boolean = false;
  length = 0;
  pageSize = 6;
  pageMaxima = 0;

  constructor(private estaVisibleService: EstaVisibleService,
    private dataService : DataService,
    private userService: UsersService) { }

  ngOnInit(): void {
    this.estaVisibleService.hacerVisibleHeader();

    this.dataService.getProductosPagination(0, this.pageSize ).subscribe((productos : any) => {
    this.length = productos.body.page.totalElements
console.log(productos);
    this.publicaciones = productos.body._embedded.productoes;
    this.esVendedor = this.userService.esVendedor();
    console.log(this.publicaciones);
    })
  }



  handlePage(event : any){

    console.log(event);
    if (event.previousPageIndex >= event.pageIndex || this.pageMaxima >= event.pageIndex ){
      return event;
    }

    this.dataService.getProductosPagination(event.pageIndex, event.pageSize).subscribe((productos : any) => {
      console.log(productos);
      this.publicaciones =  this.publicaciones.concat(productos.body._embedded.productoes) ;
      this.publicaciones = this.publicaciones.filter((publi:any) => publi.activo == true);
      console.log(this.publicaciones);
      this.pageMaxima++;
      })
  }
  pageEvent!: PageEvent;
}
