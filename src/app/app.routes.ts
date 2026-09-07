import { Routes } from '@angular/router';
import { Results } from './components/results/results';

import { Decretos } from './components/decretos/decretos';
import { DecretosUsuario } from './components/decretos-usuario/decretos-usuario';

export const routes: Routes = [
    {path: '', redirectTo: 'results', pathMatch: 'full'}, // Redirige por defecto
    {path: 'results', component: Results },
    {path: 'decretos', component: Decretos},
    {path: 'decretosUsuario', component: DecretosUsuario},
];
