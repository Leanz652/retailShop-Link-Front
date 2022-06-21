import { DataService } from './../data.service';
import { EstaVisibleService } from './../generales/header/service/esta-visible.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  publicaciones : any[] = [];

  constructor(private estaVisibleService: EstaVisibleService,
    private dataService : DataService) {
    }

  ngOnInit(): void {
  this.estaVisibleService.hacerVisibleHeader();

  this.dataService.getProductos().subscribe((productos : any) => {
  this.publicaciones = productos._embedded.productoes;
  })
}

}
