import { UsersService } from './login/service/users.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {



  vehiculos = {
    src: "../assets/coche.png",
    descripcion: "VEHICULO"
  }

  indumentaria = {
    src: "../assets/tshirt.png",
    descripcion: "INDUMENTARIA"
  }

  tecnologia = {
    src: "../assets/gadget.png",
    descripcion: "TECNOLOGIA"
  }

  farmacia = {
    src: "../assets/pharmacy.png",
    descripcion: "FARMACIA"
  }

  alimentos = {
    src: "../assets/grocery.png",
    descripcion: "ALIMENTOS"
  }

  otros = {
    src: "../assets/ellipsis.png",
    descripcion: "OTROS"
  }

  categorias: any[] = [this.vehiculos, this.indumentaria,
  this.tecnologia,this.farmacia,this.alimentos,this.otros];


  constructor(private http: HttpClient,
    private userService : UsersService) {

  }

  getCategorias(){
    return this.categorias;
  }

  getProductos() {
    return this.http.get("http://localhost:8080/productos/");
  }


  getProductosById(id: any) {
    return this.http.get("http://localhost:8080/productos/" + id);
  }

  getProveedorByLink(link: any) {
    return this.http.get(link);
  }


  getCupon(cupon: string) {
    return this.http.get("http://localhost:8080/promociones/search/findByCodigoCupon/?codigo="+cupon, {observe: 'response'});
  }

  getDolar() {
    return this.http.get("http://localhost:8080/APIDOLAR");
  }


  postProducto(producto : any) {
    return this.http.post("http://localhost:8080/productos/publicar/", producto, {observe: 'response'});
  }

  postCompra(compra : any) {
    return this.http.post("http://localhost:8080/ordenes/purchase/", compra, {observe: 'response'});
  }

  getPublicacionesVendedor(){
    return this.http.get("http://localhost:8080/vendedores/"+ this.userService.getIdRol() + "/productosPublicados");
  }

  getComprasComprador(){
    return this.http.get("http://localhost:8080/clientes/"+ this.userService.getIdRol() + "/comprasEfectuadas");
  }


  getProveedores(){
    return this.http.get("http://localhost:8080/proveedores");
  }

}
