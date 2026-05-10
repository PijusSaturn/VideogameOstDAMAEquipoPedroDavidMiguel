import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})

export class Contacto {
  nombre: string = '';
  email: string = '';
  mensaje: string = '';

  enviarFormulario() {
    alert('Mensaje enviado correctamente');
    console.log({
      nombre: this.nombre,
      email: this.email,
      mensaje: this.mensaje
    });
  }

}
