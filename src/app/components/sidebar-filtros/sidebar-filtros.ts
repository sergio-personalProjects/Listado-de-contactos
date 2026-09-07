import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar-filtros',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sidebar-filtros.html',
  styleUrl: './sidebar-filtros.css',
})
export class SidebarFiltros implements OnInit, OnDestroy {
  //variables para los filtros
  departamentoSeleccionado: string='';
  textoBusqueda: string='';
  soloTelefonos: boolean = false;
  agruparPorDepartamento: boolean=false;

  coincidencias: number = 0;
  departamentos: string[] = [];

  //Enviar información al padre --> Emite objeto con los filtros
  @Output() filtrosCambiados=new EventEmitter<{
    departamento: string;
    busqueda: string;
    soloTelefonos:boolean
    agruparPorDepartamento: boolean;
  }>();

  private contactService = inject(ContactService);
  private sub = new Subscription();

  ngOnInit(): void {
    // 👈 Escuchar directamente al servicio
    this.sub.add(
      this.contactService.coincidencias.subscribe((total) => {
        this.coincidencias = total;
      })
    );
    // 👈 Escuchar la lista de departamentos directamente del servicio
    this.sub.add(
      this.contactService.departamentos.subscribe((listaDeptos) => {
        this.departamentos = listaDeptos;
      })
    );
    this.onFiltroChange(); 
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  //Notificar la información al padre en cada cambio
  onFiltroChange(): void{
    this.filtrosCambiados.emit({
      departamento: this.departamentoSeleccionado,
      busqueda: this.textoBusqueda,
      soloTelefonos: this.soloTelefonos,
      agruparPorDepartamento: this.agruparPorDepartamento      
    });
  }

  /**Lógica para descargar le archivo CSV desde el servidor*/
  descargarCsv(): void {
    const csvUrl = 'assets/telefonos_filtrado.csv';
    
    // Creamos un enlace dinámico para forzar la descarga en el navegador
    const a = document.createElement('a');
    a.href = csvUrl;
    a.download = 'contactos.csv'; // Nombre con el que se guardará el archivo
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

}
