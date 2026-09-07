import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../../interfaces/contacts';
import { ContactService } from '../../services/contact-service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [],
  templateUrl: './results.html',
  styleUrl: './results.css',
})
export class Results implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  agruparPorDepartamento = false;

  private contactService = inject(ContactService);
  private subscription = new Subscription();

  ngOnInit(): void {
    this.subscription.add(
      this.contactService.contacts$.subscribe((contacts) => {
        this.contacts = contacts;
      })
    );

    this.subscription.add(
      this.contactService.agruparPorDepartamento$.subscribe((agrupar) => {
        this.agruparPorDepartamento = agrupar;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Getter mejorado para agrupar contactos
  get contactosAgrupados(): { departamento: string; contacts: Contact[] }[] {
    if (!this.contacts || this.contacts.length === 0) {
      return [];
    }

    const grupos = new Map<string, Contact[]>();

    for (const contact of this.contacts) {
      const depto = contact.departamento?.trim() || 'Sin departamento';
      if (!grupos.has(depto)) {
        grupos.set(depto, []);
      }
      grupos.get(depto)!.push(contact);
    }

    return Array.from(grupos.entries())
      .sort(([deptoA], [deptoB]) => deptoA.localeCompare(deptoB, 'es'))
      .map(([departamento, contacts]) => ({
        departamento,
        contacts: contacts.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es')),
      }));
  }
}
