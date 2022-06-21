import { EstaVisibleService } from './../generales/header/service/esta-visible.service';
import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './mis-publicaciones.component.html',
  styleUrls: ['./mis-publicaciones.component.css']
})
export class MisPublicacionesComponent implements OnInit {

  publicaciones : any = [];
  constructor(private dataService: DataService,
    private headervisible: EstaVisibleService) { }

  ngOnInit(): void {
    this.dataService.getPublicacionesVendedor().subscribe((publicacion :any) => {
      this.publicaciones = publicacion._embedded.productoes;
      console.log(this.publicaciones);
    })

    this.headervisible.hacerVisibleHeader();
  }

}
