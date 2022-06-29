import { UsersService } from './login/service/users.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
    return this.http.get(environment.apiBackend + "productos/");
  }



  getProductosPagination(page:any, size:any){
    return this.http.get(environment.apiBackend + "productos/" + "?page="+page + "&" + "size=" + size , {observe: 'response'});
  }

  getProductosById(id: any) {
    return this.http.get(environment.apiBackend + "productos/" + id);
  }

  getProveedorByLink(link: any) {
    return this.http.get(link);
  }


  getCupon(cupon: string) {
    return this.http.get( environment.apiBackend + "promociones/search/findByCodigoCupon/?codigo="+cupon, {observe: 'response'});
  }

  getDolar() {
    return this.http.get( environment.apiBackend +"APIDOLAR");
  }

  getItemDeCompras(linkItem : any) {
    return this.http.get("")
  }

  postProducto(producto : any) {
    return this.http.post(environment.apiBackend + "productos/publicar/", producto, {observe: 'response'});
  }



  postCompra(compra : any) {
    return this.http.post(environment.apiBackend +"ordenes/purchase/", compra, {observe: 'response'});
  }

  getPublicacionesVendedor(){
    return this.http.get(environment.apiBackend +"vendedores/"+ this.userService.getIdRol());
  }


  getPublicacionesVendedorSinHeroku(){
    return this.http.get(environment.apiBackend +"vendedores/"+ this.userService.getIdRol() + "/productosPublicados");
  }

  getComprasComprador(){
    return this.http.get(environment.apiBackend +"clientes/"+ this.userService.getIdRol() + "/comprasEfectuadas?projection=compras");
  }


  getImagenByLink(imagenLink : any) {
    return this.http.get(imagenLink);
  }

  updatePublicacion(producto : any) {
    return this.http.patch(environment.apiBackend +"productos/modificar/", producto, {observe: 'response'});

  }

  getProveedores(){
    return this.http.get(environment.apiBackend +"proveedores");
  }


  deleteProducto(id:any){
    return this.http.delete(environment.apiBackend +"productos/eliminar/"+id);
  }

}
