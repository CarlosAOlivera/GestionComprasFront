import { Component, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IUsuario } from '../../../data/IUsuario';
import { UsuarioService } from '../../../data/usuario.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-guardar-usuario',
  templateUrl: './guardar-usuario.component.html',
  styleUrls: ['./guardar-usuario.component.css']
})
export class GuardarUsuarioComponent implements OnInit {
  myForm!: FormGroup;
  submitted = false; 

  constructor(
    private formBuilder: FormBuilder, 
    private usuarioService: UsuarioService,
    private router: Router,
    private toastr: ToastrService  ) { }

  ngOnInit(): void {
    this.iniciarFormulario();
  }

  iniciarFormulario() {
    this.myForm = this.formBuilder.group({           
      Nombres: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      Apellidos: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      CorreoElectronico: ['', 
        [Validators.required, this.emailValidator(), Validators.minLength(5), Validators.maxLength(30)],
        [this.emailExistsValidator(this.usuarioService)]
      ],
      Contrasena: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30), this.passwordValidator]],
      ConfirmarContrasena: ['', [Validators.required]],
       // Rol field with a default value of 'Comprador'
      Rol: ['Comprador']
    }, { validator: this.passwordMatcher });
  }

  emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const valid = emailRegex.test(control.value);
      return valid ? null : { emailFormat: 'El formato del Correo Electrónico no es válido'  };
    };
  }

  emailExistsValidator(usuarioService: UsuarioService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return usuarioService.checkEmail(control.value).pipe(
        map(exists => (exists ? { emailExists: true } : null)),
        catchError(() => of(null))  // handle potential server errors gracefully
      );
    };
  }

  passwordValidator(control: FormControl): { [key: string]: any } | null {
    const password = control.value;
    if (!password) {
      return null;
    }
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumeric = /[0-9]/.test(password);
    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;
    return passwordValid ? null : { 'passwordStrength': true };
  }

  onConfirmPasswordBlur() {
    const passwordControl = this.myForm.get('Contrasena');
    const confirmPasswordControl = this.myForm.get('ConfirmarContrasena');
    if (passwordControl && confirmPasswordControl &&
      passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ 'passwordMismatch': true });
    } else if (confirmPasswordControl) {
      confirmPasswordControl.setErrors(null);
    }
  }

  passwordMatcher: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const group = control as FormGroup;
    const passwordControl = group.get('Contrasena');
    const confirmarPasswordControl = group.get('ConfirmarContrasena');
    
    if (passwordControl && confirmarPasswordControl) {
      const password = passwordControl.value;
      const confirmarPassword = confirmarPasswordControl.value;
      return password === confirmarPassword ? null : { 'passwordMismatch': true };
    }
    return null;
  }

  get form() { 
    return this.myForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.myForm.reset();
  }

  onSubmit() {    
    this.submitted = true;
    
    if (this.myForm.invalid) {
      console.log('Form errors:', this.myForm.errors);
      Object.keys(this.myForm.controls).forEach(key => {
        const control = this.myForm.get(key);
        if (control) {
          const controlErrors = control.errors;
          if (controlErrors) {
            Object.keys(controlErrors).forEach(keyError => {
            console.log(`Control: ${key}, Error: ${keyError}, Value:`, controlErrors[keyError]);
              if (key === 'CorreoElectronico' && keyError === 'emailExists') {
                this.toastr.error('Existe un problema con el Correo Electrónico ingresado, favor utilizar otro correo electrónico');
              }
            });
          } 
        }
      });
      return;
    }

    this.usuarioService.Guardar(this.myForm.value).subscribe({
      next: (response: any) => {
        this.toastr.success('Registro Exitoso');
        this.myForm.reset();
        this.router.navigate(['/login-usuario']);
        console.log('response', response);
      },
      error: (error) => {
        this.toastr.error('Ocurrió un error al guardar los datos');
        console.error('Error:', error);
      }
    });
  }  
}
