import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  @Output() loggeo: EventEmitter<boolean>;
  private estoyLoggeado: boolean;

  constructor(private http: HttpClient) {
    this.loggeo = new EventEmitter();
    this.estoyLoggeado = this.estaLoggeado();
  }


  login(user: User): Observable<any> {
    return this.http.post(environment.apiBackend + "usuarios/login", user, { observe: 'response' })
  }

  estaLoggeado(): boolean {
    return localStorage.getItem('idRetailShop') ? true : false;
  }


  logOut(): void {
    localStorage.removeItem('idRetailShop');
    localStorage.removeItem('rol');
    localStorage.removeItem('idRol');
    this.estoyLoggeado = false;
    this.notificarCambio();
  }

  loginstorage(response: any): void {
    localStorage.setItem('idRetailShop', response.id);
    localStorage.setItem('rol', response.rol);
    localStorage.setItem('idRol', response.idRol);
    this.estoyLoggeado = true;
    this.notificarCambio();
  }

  private notificarCambio() {
    this.loggeo.emit(this.estoyLoggeado);
  }

  getId() {
    if (this.estaLoggeado()) {
      return localStorage.getItem('idRetailShop');
    }
    return alert("No esta loggeado");
  }

  getIdRol() {
    if (this.estaLoggeado()) {
      return localStorage.getItem('idRol');
    }
    return alert("No esta loggeado");
  }

  esVendedor(): boolean {
    return localStorage.getItem('rol') === "VENDEDOR";
  }
}
