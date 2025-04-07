import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SobreComponent } from './sobre/sobre.component';
import { ProjetosComponent } from './projetos/projetos.component';
import { ContatoComponent } from './contato/contato.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'HomePage' } },
  { path: 'sobre', component: SobreComponent, data: { animation: 'SobrePage' } },
  { path: 'projetos', component: ProjetosComponent, data: { animation: 'ProjetosPage' } },
  { path: 'contato', component: ContatoComponent, data: { animation: 'ContatoPage' } },
  { path: '**', redirectTo: '' }
];