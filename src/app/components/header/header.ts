import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavbarDecretos } from '../navbar-decretos/navbar-decretos';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavbarDecretos, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  
  /**Información*/
  numberOfContacts=0
  
  /**Para hacer que el app (Padre) le pase el titulo al header (hijo) - inicialmente debemos de crearlo vacio */
  @Input() titulo = '';

  /**Recibir la vista actual desde app.component.ts ('agenda' o 'decretos') */
  @Input() vistaActual = 'agenda';

  /**Pasar el nombre de la vista actual al app (padre) al header(hijo) */
  @Output() cambiarVista = new EventEmitter<void>();
  
  /**Pasar la vista de decretos al app (padre) al header(hijo) para que este renderice la sección como toca */
  @Output() cambiarVistaDecretos = new EventEmitter<boolean>();
  

/**Método que se ejecuta al pulsar el botón del header */
  onCambiarVista(): void {
    this.cambiarVista.emit();
  }
}
