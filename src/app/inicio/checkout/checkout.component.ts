import { UsersService } from './../../login/service/users.service';
import { ActivatedRoute } from '@angular/router';
import { EstaVisibleService } from './../../generales/header/service/esta-visible.service';
import { empty, map, Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {StepperOrientation} from '@angular/material/stepper';
import {BreakpointObserver} from '@angular/cdk/layout';
import { DataService } from 'src/app/data.service';

@Component({
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class CheckoutComponent implements OnInit {

  publicacion: any;
  checkoutForm!: FormGroup;
  stepperOrientation: Observable<StepperOrientation>;
  producto: any;
  opcionDePago : number = 1;
  submitted : boolean = false;
  aplicado : boolean = false;
  cuponInvalido: boolean = false;
  cuponNro: string = "";
  descuentoAplicado : number = 0;
  cuponAplicado: string = "0";

  constructor(private formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private estaVisibleService: EstaVisibleService,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private userService : UsersService) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
   }

  ngOnInit(): void {
    this.estaVisibleService.hacerVisibleHeader();
    this.checkoutForm = this.initForm();
    this.producto = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.producto);
    this.dataService.getProductosById(this.producto).subscribe((response) => {
      this.producto = response;
    })


  }

  initForm() {
    return this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      tarjeta: ['', []],
      cvv: ['', []],
      vto: ['', []],
      tipoPago: ['', []]
    })
  }


  opcionPago(opcion : number){
    this.opcionDePago = opcion;
    if (opcion == 2) {
      this.checkoutForm.get('tipoPago')?.setValue("TARJETA");
      this.checkoutForm.get('tarjeta')!.setValidators(Validators.required);
      this.checkoutForm.get('cvv')!.setValidators(Validators.required);
      this.checkoutForm.get('vto')!.setValidators(Validators.required);
      this.checkoutForm.get('cvv')!.updateValueAndValidity();
      this.checkoutForm.get('vto')!.updateValueAndValidity();
      this.checkoutForm.get('tarjeta')!.updateValueAndValidity();
    } else {
      this.checkoutForm.get('tarjeta')!.removeValidators(Validators.required);
      this.checkoutForm.get('cvv')!.removeValidators(Validators.required);
      this.checkoutForm.get('vto')!.removeValidators(Validators.required);
      this.checkoutForm.get('cvv')!.updateValueAndValidity();
      this.checkoutForm.get('vto')!.updateValueAndValidity();
      this.checkoutForm.get('tarjeta')!.updateValueAndValidity();
    }

    if (opcion == 1 ){
      this.checkoutForm.get('tipoPago')?.setValue("BILLETERA_VIRTUAL");
    }

    if (opcion == 3 ){
      this.checkoutForm.get('tipoPago')?.setValue("TRANSFERENCIA");
    }
  }


  finalizarCompra(productoAComprar: any){

    this.submitted = true;
    console.log(this.producto);

    if (!this.checkoutForm.valid || this.opcionDePago == null) {
      return
    }
    const datosCompra = this.checkoutForm.getRawValue();

    const productoData = new FormData();
    productoData.append('factura', datosCompra);
    productoData.append('idComprador',this.userService.getIdRol()!);
    productoData.append('producto', productoAComprar.id);
    productoData.append('cupon', this.cuponAplicado);

    console.log(datosCompra);

    console.log(productoAComprar.id);

    this.dataService.postCompra(productoData).subscribe((response) => {
      console.log(response);
    })
  }


  validarCuponYAplicarlo(cupon : string){
    this.aplicado = true;
    this.dataService.getCupon(cupon).subscribe((cuponrta: any) => {

      if (cuponrta.status == 200){
        this.cuponInvalido = false;
        this.descuentoAplicado =+ cuponrta.body.valorDeDescuento;
        this.cuponAplicado = cuponrta.body.id;
        console.log(this.cuponAplicado);
      }
    }, error => {
      if (error.status == 404 ) {
        this.cuponInvalido = true;
      }
    } )
  }
}
