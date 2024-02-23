import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IComprador } from '../../../data/IComprador';
import { CompradorService } from '../../../data/comprador.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guardar-comprador',
  templateUrl: './guardar-comprador.component.html',
  styleUrl: './guardar-comprador.component.css'
})
export class GuardarCompradorComponent implements OnInit {
  myForm!: FormGroup;    
  submitted = false; 

  constructor(private formBuilder: FormBuilder, private compradorService: CompradorService) { }

  iniciarFormulario(){
    this.myForm = this.formBuilder.group({           
      //Temporary Guid
      IdComprador:['58650f7d-2495-4a2c-9092-493dc2ecda63'],          
      Nombres: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      Apellidos: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      CorreoElectronico: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      TipoDeDocumento: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      NumeroDeDocumento: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(16)]],                    
      Contrasena: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],   
      Genero: ['', [, Validators.minLength(8), Validators.maxLength(9)]],
      Direccion: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(30)]],                    
      Rol: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
    });
  }

  ngOnInit(): void {
    this.iniciarFormulario();
  }

  get form(): { [key: string]: AbstractControl; }
  {
      return this.myForm.controls;
  }

  onReset(): void {
    this.submitted = false;
    this.myForm.reset();
  }

  getWeather(): void {
    this.compradorService.GetWeather().then((response: any) => {
      console.log('response GetWeather', response);                     
    })
    .catch((error: any) => {
      console.error(': ', error);
    }) 
  }

  onSubmit() {    
    this.submitted = true;
    console.log("Form value ", this.myForm.value);

    if (this.myForm.invalid) {
      console.log('Error')          
      return
    }     
    
    //this.form.get('IdComprador')?.setValue("58650f7d-2495-4a2c-9092-493dc2ecda63");
    this.compradorService.Guardar(this.myForm.value).then((response: any) => {
      console.log('response', response);               
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
