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
    this.buscarPublicacionesActivas();
    this.headervisible.hacerVisibleHeader();
  }



  buscarPublicacionesActivas() {
    this.dataService.getPublicacionesVendedor().subscribe((publicacion :any) => {
      this.publicaciones = publicacion._embedded.productosPublicados;
      console.log(this.publicaciones);
      this.publicaciones = this.publicaciones.filter((publi:any) => publi.activo == true);
    })
  }


  eliminarProducto(id : any){
    this.dataService.deleteProducto(id).subscribe( response => {
      this.buscarPublicacionesActivas();
    })
  }

}
