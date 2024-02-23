import { Component, NgModule, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IComprador } from '../../../data/IComprador';
import { CompradorService } from '../../../data/comprador.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-comprador',
  templateUrl: './login-comprador.component.html',
  styleUrl: './login-comprador.component.css'
})
export class LoginCompradorComponent implements OnInit {
  myForm!: FormGroup;    
  submitted = false; 

  constructor(private formBuilder: FormBuilder, private compradorService: CompradorService) {
    console.log ('LoginCompradorComponent constructor');
   }

  iniciarFormulario(){
    this.myForm = this.formBuilder.group({                
      CorreoElectronico: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],                      
      Contrasena: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]         
    });
  }

  ngOnInit(): void {
    this.iniciarFormulario();
    console.log('LoginCompradorComponent ngOnInit');
  }

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

    if (this.myForm.invalid) {
      console.log('Error')          
      return
    }     
    
    //this.form.get('IdComprador')?.setValue("58650f7d-2495-4a2c-9092-493dc2ecda63");
    //David@gmail.com Ospina1
    this.compradorService.Login(this.myForm.value).then((response: any) => {
      console.log('response', response.result);               
      localStorage.setItem('token', response.result);
    })
    .catch((error: any) => {
      console.error(': ', error);
    })     

    // this.compradorService.Guardar(this.myForm.value).subscribe(              
    //              result => console.log('success ', result),                 
    //              error => console.log('error ', error)                 
    //          );                 
  }  
}
