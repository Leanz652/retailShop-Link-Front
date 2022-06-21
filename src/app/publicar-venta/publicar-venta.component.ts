import { Router } from '@angular/router';
import { UsersService } from './../login/service/users.service';
import { DataService } from './../data.service';
import { EstaVisibleService } from './../generales/header/service/esta-visible.service';
import { Component, OnInit } from '@angular/core';
import { Producto} from './producto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './publicar-venta.component.html',
  styleUrls: ['./publicar-venta.component.css']
})
export class PublicarVentaComponent implements OnInit {


  proveedoresDisp: any[]= [];

  contactForm!: FormGroup;
  submitted: boolean = false;
  uploadImage!: File;
  dbImage: any;
  postResponse: any;
  successResponse: boolean;
  image: any;
  dbUrl: any;
  idImage: any;
  favorite: any;
  valorDolar: number = 2;

  categorias : any[] = [];

    producto : Producto = {
      precio : 0,
      tipoProducto : "",
      proveedor: "",
      nombre : '',
      descripcion : ''
    }

  constructor(
    private estaVisible :EstaVisibleService,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private router: Router )
    {
      this.successResponse = false;
     }

  ngOnInit(): void {
    this.estaVisible.hacerVisibleHeader();
    this.contactForm = this.initForm();
    this.categorias = this.dataService.getCategorias();
    console.log(this.categorias);


    this.dataService.getProveedores().subscribe((proveedores: any) => {
      this.proveedoresDisp = proveedores._embedded.proveedors;

    })


    this.dataService.getDolar().subscribe((response : any) => {
      this.valorDolar = response;
    })

  }

  public onImageUpload(event: any) {
    this.uploadImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadImage);
    reader.onload = (_event) => {
    this.dbUrl = reader.result;
    this.successResponse=true;
  }
}
  uploadProduct() {
    const productoData = new FormData();
    this.producto = this.contactForm.getRawValue();
    console.log(this.producto);
    productoData.append('image', this.uploadImage, this.uploadImage?.name);
    productoData.append('producto', JSON.stringify(this.producto));
    productoData.append('idVendedor',this.userService.getId()!);

    this.dataService.postProducto(productoData).subscribe((response) => {
      if (response.status === 200) {
        console.log("todo ok");
        this.router.navigate(['/mis-publicaciones']);

      } else {
        alert("Algo salió mal");
      }
    })
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

  onSubmit(): void {
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
    }



    this.uploadProduct();
  }

  favorites(index: number){
    this.favorite = index;
    console.log(index)
  }


}

