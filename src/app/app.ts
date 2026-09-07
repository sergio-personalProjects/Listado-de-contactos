import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Results } from './components/results/results';
import { SidebarFiltros } from './components/sidebar-filtros/sidebar-filtros';
import { Decretos } from './components/decretos/decretos';
import { DecretosUsuario } from './components/decretos-usuario/decretos-usuario';
import { Contact } from './interfaces/contacts';
import { ContactService } from './services/contact-service';
import { FiltrosAgenda } from './interfaces/filtrosAgenda';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, Results, SidebarFiltros, Decretos, DecretosUsuario],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit { 
//CODIGO PARA CARGA DE CSV DESDE WEB
protected readonly title = signal('project');
  private contactService = inject(ContactService);

  /** Número de contactos disponibles para enviar a otros componentes */
  numberOfContacts = 0;

  /** Alternar entre vista de agenda y decretos */
  vistaActual: 'agenda' | 'decretos' = 'agenda';

  /** Alternar entre tablas de decretos generales y por usuario */
  mostrarPorUsuario = false;

  /** Arrays para la gestión de contactos */
  contactos: Contact[] = [];
  contactosFiltrados: Contact[] = [];
  departamentos: string[] = [];

  /** Cambia la vista activa de la aplicación */
  cambiarVista(): void {
    this.vistaActual = this.vistaActual === 'agenda' ? 'decretos' : 'agenda';
  }

  /**
   * Carga inicial de datos asíncronos desde el CSV
   */
  ngOnInit(): void {
    this.contactService.cargarContactosDesdeCsv().subscribe({
      next: (data: Contact[]) => {
        console.log('Contactos recibidos en app.ts:', data);

        this.contactos = data;
        this.contactService.setContactosIniciales(data);
        this.departamentos = this.contactService.getDepartamentos();
        this.numberOfContacts = data.length;

        // Forzar renderizado en Results aplicando filtros
        this.aplicarFiltros({
          departamento: '',
          busqueda: '',
          soloTelefonos: false,
          agruparPorDepartamento: false,
        });
      },
      error: (err: unknown) => {
        console.error('Error al descargar o procesar el archivo CSV:', err);
      },
    });
  }

  /**
   * Limpia y estandariza cadenas de texto ignorando mayúsculas,
   * acentos y espacios adicionales para comparaciones precisas.
   */
  private normalizar(valor: string): string {
    if (!valor) return '';
    return valor
      .toLowerCase()
      .normalize('NFD') // Descompone caracteres complejos (ej: é -> e + ´)
      .replace(/[\u0300-\u036f]/g, '') // Elimina los símbolos de acentos
      .trim(); // Elimina espacios vacíos extremos
  }

  /**
   * Filtra los contactos locales y notifica el resultado al servicio
   */
  aplicarFiltros(filtros: FiltrosAgenda): void {
    const busquedaNormalizada = this.normalizar(filtros.busqueda || '');
    const deptoSeleccionado = filtros.departamento || '';

    this.contactosFiltrados = this.contactos.filter((contacto) => {
      // 1. Filtrar por departamento
      const coincideDepartamento =
        !deptoSeleccionado || contacto.departamento === deptoSeleccionado;

      // 2. Filtrar por texto de búsqueda (nombre, teléfono corto o largo)
      const nombreNorm = this.normalizar(contacto.nombre || '');
      const cortoNorm = this.normalizar(contacto.corto || '');
      const largoNorm = this.normalizar(contacto.largo || '');

      const coincideBusqueda =
        !busquedaNormalizada ||
        nombreNorm.includes(busquedaNormalizada) ||
        cortoNorm.includes(busquedaNormalizada) ||
        largoNorm.includes(busquedaNormalizada);

      // 3. Filtrar por presencia de teléfono
      const tieneTelefono =
        !filtros.soloTelefonos ||
        Boolean(contacto.corto && contacto.corto.trim()) ||
        Boolean(contacto.largo && contacto.largo.trim());

      return coincideDepartamento && coincideBusqueda && tieneTelefono;
    });

    // 👈 ACTUALIZAR EL CONTADOR DE COINCIDENCIAS
    this.numberOfContacts = this.contactosFiltrados.length;

    // Notificar al servicio para actualizar los componentes dependientes (ej: Results)
    this.contactService.setResultadosFiltrados(
      this.contactosFiltrados,
      filtros.agruparPorDepartamento
    );
  }






  
}
