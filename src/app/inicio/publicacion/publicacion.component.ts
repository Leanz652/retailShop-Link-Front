import { UsersService } from './../../login/service/users.service';
import { DataService } from './../../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EstaVisibleService } from 'src/app/generales/header/service/esta-visible.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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


  contactForm!: FormGroup;
  producto : any = "";
  provedor : any = "";
  valorDolar : any;
  esCliente: boolean = true;
  proveedoresDisp: any;
  categorias: any;
  idImage: any = "";

  constructor(private estaVisibleService: EstaVisibleService,
    private ruta: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private userService : UsersService,
    private formBuilder: FormBuilder) {
      this.id = this.ruta.snapshot.params['id'];
     }



  ngOnInit(): void {
    this.contactForm = this.initForm();
    this.esCliente = !this.userService.esVendedor();
    this.estaVisibleService.hacerVisibleHeader();
    this.dataService.getProductosById(this.id).subscribe((response : any) => {

      this.producto = response;
      console.log(this.producto);


      this.dataService.getImagenByLink(response._links.imagen.href).subscribe((rtaImg : any) => {

        this.idImage = rtaImg.id;
      });

      this.dataService.getProveedorByLink(response._links.proveedorDeProducto.href).subscribe((responseProv) => {
        this.provedor = responseProv;
      })
      this.dataService.getDolar().subscribe(response => {
        this.valorDolar = response;
        this.valorDolar = this.producto.precio / this.valorDolar;
      })

    });

    this.dataService.getProveedores().subscribe((proveedores: any) => {
      this.proveedoresDisp = proveedores._embedded.proveedors;

    })


    this.categorias = this.dataService.getCategorias();

  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      nombre: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      proveedor: ['', [Validators.required]],
      tipoProducto: ['', [Validators.required]],
      descripcion: ['', [Validators.required]]
    })
  }

  realizarCompra(producto: any){
    this.router.navigate(['/checkout', {id: producto.id}])
  }


  editar(producto:any) {
    const productoData = new FormData();
    productoData.append('nombre', this.producto.nombre);
    productoData.append('descripcion', this.producto.descripcion);
    productoData.append('id',this.producto.id);
    productoData.append('precio',this.producto.precio);
    this.dataService.updatePublicacion(productoData).subscribe(response => {
      this.router.navigate(['/mis-publicaciones']);
    });



  }

}
