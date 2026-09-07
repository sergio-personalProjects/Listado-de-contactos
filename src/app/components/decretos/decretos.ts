import { NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Decreto } from '../../interfaces/decretosInterface';
import { DecretoService } from '../../services/decreto-service';

@Component({
  selector: 'app-decretos',
  standalone: true,
  imports: [NgFor],
  templateUrl: './decretos.html',
  styleUrl: './decretos.css',
})
export class Decretos implements OnInit{
/**INYECCIÓN DEL SERVICIO */
decretos: Decreto[] = [];

// Inyección del servicio
  private decretoService = inject(DecretoService);


  ngOnInit(): void {
    // Obtenemos todos los decretos del servicio
    this.decretos = this.decretoService.getDecretos();
  }

}
