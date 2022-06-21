import { EstaVisibleService } from './../generales/header/service/esta-visible.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor(
    private estaVisibileService: EstaVisibleService
  ) { }

  ngOnInit(): void {
    this.estaVisibileService.hacerVisibleHeader();
  }

}
