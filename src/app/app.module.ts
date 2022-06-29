import { GeneralesModule } from './generales/generales.module';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { PublicarVentaComponent } from './publicar-venta/publicar-venta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { NgxMaskModule } from "ngx-mask";
import { CarritoComponent } from './carrito/carrito.component';
import { MisComprasComponent } from './mis-compras/mis-compras.component';
import { PublicacionComponent } from './inicio/publicacion/publicacion.component';
import { MisPublicacionesComponent } from './mis-publicaciones/mis-publicaciones.component';
import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CheckoutComponent } from './inicio/checkout/checkout.component';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { ListPublicacionesComponent } from './list-publicaciones/list-publicaciones.component';
import {MatPaginatorModule} from '@angular/material/paginator';


registerLocaleData(localeEsAr, 'es-Ar');


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    PublicarVentaComponent,
    CarritoComponent,
    MisComprasComponent,
    PublicacionComponent,
    MisPublicacionesComponent,
    CheckoutComponent,
    ListPublicacionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GeneralesModule,
    HttpClientModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatCardModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-Ar' }],
  bootstrap: [AppComponent],
  exports: [
    PublicacionComponent
  ]
})
export class AppModule { }
