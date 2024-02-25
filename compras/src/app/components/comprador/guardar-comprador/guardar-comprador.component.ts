import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IComprador } from '../../../data/IComprador';
import { CompradorService } from '../../../data/comprador.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-guardar-comprador',
  templateUrl: './guardar-comprador.component.html',
  styleUrls: ['./guardar-comprador.component.css']
})
export class GuardarCompradorComponent implements OnInit {
  myForm!: FormGroup;    
  submitted = false; 

  constructor(
    private formBuilder: FormBuilder, 
    private compradorService: CompradorService
  ) { }

  ngOnInit(): void {
    this.iniciarFormulario();
  }

  iniciarFormulario() {
    this.myForm = this.formBuilder.group({           
      IdComprador:['58650f7d-2495-4a2c-9092-493dc2ecda63'], // Temporary Guid
      Nombres: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      Apellidos: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      CorreoElectronico: ['', [Validators.required, Validators.email, Validators.maxLength(30)]],
      TipoDeDocumento: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      NumeroDeDocumento: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(16)]],
      Contrasena: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30), this.passwordValidator]],
      ConfirmarContrasena: ['', [Validators.required]],
      Genero: ['', [Validators.minLength(8), Validators.maxLength(9)]],
      Direccion: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(30)]],
      Rol: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
    }, { validator: this.passwordMatcher });
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

  passwordMatcher(group: FormGroup): { [key: string]: any } | null {
    const password = group.controls['Contrasena'].value;
    const confirmarPassword = group.controls['ConfirmarContrasena'].value;
    return password === confirmarPassword ? null : { 'passwordMismatch': true };
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
    console.log("Form value", this.myForm.value);
    console.log("Form valid", this.myForm.valid);

    if (this.myForm.invalid) {
      console.log('Form is invalid:', this.myForm.errors);
      return;
    }

    this.compradorService.Guardar(this.myForm.value)
      .then((response: any) => {
        console.log('response', response);
      })
      .catch((error: any) => {
        console.error('Error:', error);
      });

  }  
}
