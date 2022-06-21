import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstaVisibleService {

  private estaVisibile : boolean;
  @Output() cambioDeVisibilidad : EventEmitter<boolean>;

  constructor() {
    this.cambioDeVisibilidad = new EventEmitter();
    this.estaVisibile = false;
   }

   public hacerVisibleHeader(){
    this.estaVisibile = true;
    this.notificarCambio();
   }


   public apagarHeader(){
    this.estaVisibile = false;
    this.notificarCambio();
   }

   private notificarCambio() {
    this.cambioDeVisibilidad.emit(this.estaVisibile);
   }

}
