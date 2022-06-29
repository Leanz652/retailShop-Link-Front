import { UsersService } from './../login/service/users.service';
import { EstaVisibleService } from './../generales/header/service/esta-visible.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  templateUrl: './mis-compras.component.html',
  styleUrls: ['./mis-compras.component.css']
})
export class MisComprasComponent implements OnInit {

  misCompras : any = [];
  constructor(private dataService: DataService,
    private headervisible: EstaVisibleService) { }

  ngOnInit(): void {
    this.dataService.getComprasComprador().subscribe((publicacion :any) => {
      console.log(publicacion);
      this.misCompras = publicacion._embedded.ordenCompras
      console.log(this.misCompras);
    })

    this.headervisible.hacerVisibleHeader();
  }


}
