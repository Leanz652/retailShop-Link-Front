import { ActivatedRoute, Router } from '@angular/router';
import { EstaVisibleService } from './../generales/header/service/esta-visible.service';
import { Component, OnInit } from '@angular/core';
import { UsersService } from './service/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from './user';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  contactForm!: FormGroup;
  submitted: boolean = false;
  redirectURL: string;

  constructor(private estaVisible: EstaVisibleService,
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {
    this.redirectURL = "";
  }

  ngOnInit(): void {
    this.estaVisible.apagarHeader();
    this.contactForm = this.initForm();
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.contactForm.invalid) {
      return;
    }
    this.login();
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]]
    })
  }

  login() {
    const user: User = (this.contactForm.getRawValue());
    this.userService.login(user).subscribe((response) => {

      if (response.status == 200) {
        this.userService.loginstorage(response.body);
        this.router.navigate(['/']);

        let params = this.route.snapshot.queryParams;
        if (params['redirectURL']) {
          this.redirectURL = params['redirectURL'];
        }
        if (this.redirectURL) {
          this.router.navigateByUrl(this.redirectURL,)
            .catch(() => this.router.navigate(['/']))
        } else {
          this.router.navigate(['/'])
        }
      }

    }, error => {
      if (error.status == 401 || error.status == 404 ) {
        alert("Usuario/contraseña incorrecta")
      }
    });




  }


}
