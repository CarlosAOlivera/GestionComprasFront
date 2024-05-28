import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-confirmar-correo',
  templateUrl: './confirmar-correo.component.html',
  styleUrl: './confirmar-correo.component.css'
})

export class ConfirmarCorreoComponent implements OnInit {
  confirmationMessage: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UsuarioService,
    private router: Router
  ){}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParams['token'];
    const email = this.route.snapshot.queryParams['email'];

    if (token && email) {
      this.userService.confirmEmail(token, email).subscribe(
        () => {
          this.confirmationMessage = 'Tu correo ha sido confirmado exitosamente. Ahora puedes iniciar sesión.';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 5000);
        },
        (error) => {
          this.confirmationMessage = 'Ha ocurrido un error al confirmar tu correo. Por favor intenta de nuevo.';
          console.error(error);
        }
      );
    }
      
  }

}
