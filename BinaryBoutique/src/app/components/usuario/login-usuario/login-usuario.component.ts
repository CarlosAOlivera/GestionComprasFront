import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginViewModel } from '../../../models/login-view-model';


@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css']
})
export class LoginUsuarioComponent implements OnInit {
  myForm!: FormGroup;    
  submitted = false; 
  emailValidator: any | string; 
  passwordValidator: any | string;
  loginError!: string;
  password!: string;
  form: any;
  model: LoginViewModel = { email: '', password: '' };
  errorMessage: string = '';

  constructor(
    private dialogRef: MatDialogRef<LoginUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder, 
    private usuarioService: UsuarioService,
    private router: Router,
    private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      CorreoElectronico: ['', [Validators.required, Validators.email]],
      Contrasena: ['', Validators.required]
    });
  }
    
  iniciarFormulario(){
    this.myForm = this.formBuilder.group({                
      CorreoElectronico: ['', [Validators.required, Validators.email, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/), Validators.minLength(5), Validators.maxLength(30)]],
      Contrasena: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
    });
  }

  get contrasena() {
    return this.myForm.get('Contrasena');
  }


  onReset(): void {
    this.submitted = false;
    this.myForm.reset();
  }

  onSubmit() {    
    this.submitted = true;
    if (this.myForm.invalid) {
      this.toastr.error('Por favor, completa el formulario correctamente.');        
      return;
    }     
    
    this.usuarioService.Login(this.myForm.value).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.result);
        localStorage.setItem('username', response.nombre);
        this.dialogRef.close();
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        this.loginError = 'Ocurrió un error al intentar iniciar sesión.';
        this.toastr.error(this.loginError);
      }                  
    });
  }

  closeDialogAndNavigate() {
    this.dialogRef.close();
    setTimeout(() => {
      this.router.navigate(['/guardar-usuario']);
    }, 500);
  }
}
