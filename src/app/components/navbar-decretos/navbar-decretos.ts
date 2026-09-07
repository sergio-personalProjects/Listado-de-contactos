import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-decretos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar-decretos.html',
  styleUrl: './navbar-decretos.css',
})
export class NavbarDecretos {
  /**Pasar al app (padre) que el usuario quiere cambiar la vista de decretos */
  @Output() cambiarVista = new EventEmitter<boolean>();

  /**Variable de control */
  mostrarPorUsuario=false;


  cambiar():void{
    this.mostrarPorUsuario=!this.mostrarPorUsuario;
    this.cambiarVista.emit(this.mostrarPorUsuario);
  }
}
