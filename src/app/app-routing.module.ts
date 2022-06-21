import { ComprarGuard } from './guard/comprar.guard';
import { CheckoutComponent } from './inicio/checkout/checkout.component';
import { PublicacionComponent } from './inicio/publicacion/publicacion.component';
import { CarritoComponent } from './carrito/carrito.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicarVentaComponent } from './publicar-venta/publicar-venta.component';
import { MisComprasComponent } from './mis-compras/mis-compras.component';
import { PublicarGuard } from './guard/publicar.guard';
import { MisComprasGuard } from './guard/mis-compras.guard';
import { MisPublicacionesComponent } from './mis-publicaciones/mis-publicaciones.component';


const routes: Routes =
[{path : "login" , component: LoginComponent},
{path : "", component: InicioComponent},
{path:"cart" , component: CarritoComponent},
{path:"mis-compras", component: MisComprasComponent, canActivate: [MisComprasGuard]},
{path : "publicar", component: PublicarVentaComponent, canActivate: [PublicarGuard]},
{path : "mis-publicaciones", component: MisPublicacionesComponent, canActivate: [PublicarGuard]},
{path: "publicacion/:id", component: PublicacionComponent},
{path: "checkout", component: CheckoutComponent, canActivate: [ComprarGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
