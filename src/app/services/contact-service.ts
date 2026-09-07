import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Contact } from '../interfaces/contacts';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root' //Para que sea accesible en toda la app
})

export class ContactService {

/***************CARGA DE CSV */
  private http=inject(HttpClient);
  //Carga alternativa de CSV desde el propio proyecto de Angular (Necesario disponer del archivo CSV en la carpeta "assets" del proyecto Angular)
  private csvUrl = 'assets/telefonos_filtrado.csv'; //Ruta alternativa del CSV en la carpeta "assets" del proyecto Angular

  //Lista de usuarios
  private usuariosLista: Contact[] = [];

  // 1. Añade este sujeto en la declaración de variables:
  private coincidenciasSubject = new BehaviorSubject<number>(0);
  coincidencias = this.coincidenciasSubject.asObservable();

  private departamentosSubject = new BehaviorSubject<string[]>([]);
  departamentos = this.departamentosSubject.asObservable();


  // Método de utilidad para buscar un usuario por su nombre
  private contactsSubject = new BehaviorSubject<Contact[]>([]);
  contacts$ = this.contactsSubject.asObservable();

  private agruparPorDepartamentoSubject = new BehaviorSubject<boolean>(false);
  agruparPorDepartamento$ = this.agruparPorDepartamentoSubject.asObservable();

  /**
   * Descarga el archivo CSV como texto y lo transforma en un array de Contact[]
   */
  cargarContactosDesdeCsv(): Observable<Contact[]> {
    return this.http.get(this.csvUrl, { responseType: 'text' }).pipe(
      // 2. Tipamos explícitamente (csvTexto: string) para evitar el error de 'any'
      map((csvTexto: string) => this.parsearCsv(csvTexto))
    );
  }

  /**
   * Convierte las líneas del texto CSV en objetos con la interfaz Contact
   */
  private parsearCsv(csvTexto: string): Contact[] {
    // 🔍 Imprimimos el texto crudo recibido para verificar la respuesta del servidor
    console.log('--- CONTENIDO RAW DEL CSV ---', csvTexto);
    
    const lineas = csvTexto.split(/\r\n|\n/);
    if (lineas.length <= 1) return [];

    const separador = csvTexto.includes(';') ? ';' : ',';
    const contactos: Contact[] = [];

    for (let i = 1; i < lineas.length; i++) {
      const linea = lineas[i].trim();
      if (!linea) continue;

      const columnas = linea.split(separador).map(col => col.replace(/^"|"$/g, '').trim());

      // 🔍 Imprime la primera fila de datos recibida para verificar el índice de las columnas
      if (i === 1) {
        console.log('Fila 1 parseada (Columnas):', columnas);
      }

      const contacto: Contact = {
        departamento: columnas[0] || 'Sin departamento',
        nombre: columnas[1] || '',
        corto: columnas[2] || '',
        largo: columnas[3] || ''
      };

      contactos.push(contacto);
    }

    console.log('Total contactos parseados:', contactos.length);
    return contactos;
  
  }

  setContactosIniciales(contactos: Contact[]): void {
    this.usuariosLista = contactos;
    this.contactsSubject.next(contactos);

    // Extraemos y emitimos los departamentos
    const deptos = this.getDepartamentos();
    this.departamentosSubject.next(deptos);
  }

  getContacts(): Contact[] {
    return this.usuariosLista;
  }

  setResultadosFiltrados(contactos: Contact[], agruparPorDepartamento: boolean): void {
    this.contactsSubject.next(contactos);
    this.agruparPorDepartamentoSubject.next(agruparPorDepartamento);
    this.coincidenciasSubject.next(contactos.length);
  }

  getDepartamentos(): string[] {
    return [...new Set(this.usuariosLista.map((contacto) => contacto.departamento))]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b, 'es'));
  }

  getContactByNombre(nombre: string): Contact | undefined {
    return this.usuariosLista.find(u => u.nombre === nombre);
  }
}
