import { Component, inject } from '@angular/core';
import { Decreto } from '../../interfaces/decretosInterface';
import { NgFor } from '@angular/common';
import { DecretoService } from '../../services/decreto-service';

@Component({
  selector: 'app-decretos-usuario',
  standalone: true,
  imports: [NgFor],
  templateUrl: './decretos-usuario.html',
  styleUrl: './decretos-usuario.css',
})
export class DecretosUsuario {

  /**INYECCIÓN DEL SERVICIO */
  decretos: Decreto[] = [];

  // Inyección del mismo servicio
  private decretosService = inject(DecretoService);

  ngOnInit(): void {
    // Obtenemos los datos filtrados o preparados para la vista por usuario
    this.decretos = this.decretosService.getDecretosPorUsuario();
  }

}
