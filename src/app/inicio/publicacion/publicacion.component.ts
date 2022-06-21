import { UsersService } from './../../login/service/users.service';
import { DataService } from './../../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EstaVisibleService } from 'src/app/generales/header/service/esta-visible.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class PublicacionComponent implements OnInit {

  id : number;



  producto : any | null = null;
  provedor : any;
  valorDolar : any;
  esCliente: boolean = true;

  constructor(private estaVisibleService: EstaVisibleService,
    private ruta: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private userService : UsersService) {
      this.id = this.ruta.snapshot.params['id'];
     }



  ngOnInit(): void {
    this.esCliente = !this.userService.esVendedor();
    this.estaVisibleService.hacerVisibleHeader();
    this.dataService.getProductosById(this.id).subscribe((response : any) => {
      this.producto = response;
      this.dataService.getProveedorByLink(response._links.proveedorDeProducto.href).subscribe((responseProv) => {
        this.provedor = responseProv;
      })

    });

    this.dataService.getDolar().subscribe(response => {
      this.valorDolar = response;
      this.valorDolar = this.producto.precio / this.valorDolar;
    })

  }


  realizarCompra(producto: any){
    this.router.navigate(['/checkout', {id: producto.id}])
  }

}
