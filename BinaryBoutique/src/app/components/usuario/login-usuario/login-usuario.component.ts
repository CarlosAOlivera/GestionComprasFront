import { Component, NgModule, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUsuario } from '../../../data/IUsuario';
import { UsuarioService } from '../../../services/usuario.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css']
})
export class LoginUsuarioComponent implements OnInit {
  myForm!: FormGroup;    
  submitted = false; 
 
  passwordValidator: any | string;
  loginError!: string;
  password!: string;

  constructor(
    private formBuilder: FormBuilder, 
    private usuarioService: UsuarioService,
    private router: Router,
    private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.iniciarFormulario();
    console.log('LoginUsuarioComponent ngOnInit');
  }

  iniciarFormulario(){
    this.myForm = this.formBuilder.group({                
      CorreoElectronico: ['', [Validators.required, Validators.email, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/), Validators.minLength(5), Validators.maxLength(30)]],
      Contrasena: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
    });
  }
  /*emailValidator(): any | string {
    throw new Error('Method not implemented.');
  }*/

  get form(): { [key: string]: AbstractControl; }
  {
      return this.myForm.controls;
  }

  onReset(): void {
    this.submitted = false;
    this.myForm.reset();
  }

  onSubmit() {    
    this.submitted = true;
    console.log("Form value ", this.myForm.value);
    this.loginError = '';

    if (this.myForm.invalid) {
      console.log('Error');  
      this.toastr.error('Por favor, completa el formulario correctamente.');        
      return;
    }     
    
    this.usuarioService.Login(this.myForm.value).subscribe({
      next: (response: any) => {
        console.log('response', response.result);               
        localStorage.setItem('token', response.result);
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        if(error.status === 401) {
          this.loginError = 'Correo electronico o contraseña incorrectos.';
        } else {
          this.loginError = 'Ocurrió un error al intentar iniciar sesión.';
        }
        this.toastr.error(this.loginError);
        console.error('Error: ', error);
      }                  
    });
  }
}
