import { inject, Injectable } from '@angular/core';
import { Decreto } from '../interfaces/decretosInterface';
import { ContactService } from './contact-service';


@Injectable({
  providedIn: 'root' //Para que sea accesible en toda la app
})

export class DecretoService {
    // Inyectamos ContactService
    private contactService = inject(ContactService);


    // Array centralizado único
  private decretosLista: Decreto[] = [
    {
      num_decreto: 'D-00X/2026',
      descripcion: 'Aprobación de las actividades culturales de verano',
      fecha: '01/07/2026',
      firmado: true,
      acabado: true,
      departamento: 'Informática'
    },
    {
      num_decreto: 'D-00X/2026',
      descripcion: 'Adjudicación del contrato de mantenimiento',
      fecha: '03/07/2026',
      firmado: true,
      acabado: false,
      departamento: 'Informática'
    },
    {
      num_decreto: 'D-00X/2026',
      descripcion: 'Concesión de ayudas municipales',
      fecha: '08/07/2026',
      firmado: false,
      acabado: false,
      departamento: 'Recursos Humanos'
    },
    {
      num_decreto: 'D-00X/2026',
      descripcion: 'Aprobación de la programación deportiva',
      fecha: '12/07/2026',
      firmado: false,
      acabado: true,
      departamento: 'Intervención'
    },
    {
      num_decreto: 'D-00X/2026',
      descripcion: 'Decreto de ejemplo',
      fecha: '12/07/2026',
      firmado: true,
      acabado: true,
      departamento: 'Urbanismo'
    },
    {
      num_decreto: 'D-00X/2026',
      descripcion: 'Decreto de ejemplo',
      fecha: '12/07/2026',
      firmado: true,
      acabado: true,
      departamento: 'Tesorería'
    },
    {
      num_decreto: 'D-00X/2026',
      descripcion: 'Decreto de ejemplo',
      fecha: '12/07/2026',
      firmado: false,
      acabado: false,
      departamento: 'Tesorería'
    },
    {
      num_decreto: 'D-00X/2026',
      descripcion: 'Decreto de ejemplo',
      fecha: '12/07/2026',
      firmado: true,
      acabado: false,
      departamento: 'Alcaldía'
    },
    {
      num_decreto: 'D-00X/2026',
      descripcion: 'Decreto de ejemplo',
      fecha: '12/07/2026',
      firmado: false,
      acabado: true,
      departamento: 'Alcaldía'
    },
    {
      num_decreto: 'D-00X/2026',
      descripcion: 'Decreto de ejemplo',
      fecha: '12/07/2026',
      firmado: true,
      acabado: true,
      departamento: 'Urbanismo'
    },
    {
      num_decreto: 'D-00X/2026',
      descripcion: 'Decreto de ejemplo',
      fecha: '12/07/2026',
      firmado: false,
      acabado: false,
      departamento: 'Urbanismo'
    },
  ];

  // Método 1: Devuelve todos los decretos tal cual
  getDecretos(): Decreto[] {
    return this.decretosLista;
  }

  
  // Método 2: Devuelve solo los decretos que tienen departamento asignado (o filtra según necesites)
  getDecretosPorUsuario(): Decreto[] {
  return this.decretosLista.filter(
    (decreto) => decreto.departamento !== undefined && decreto.departamento !== ''
  );
}

}
