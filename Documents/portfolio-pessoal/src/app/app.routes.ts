import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SobreComponent } from './sobre/sobre.component';
import { ProjetosComponent } from './projetos/projetos.component';
import { ContatoComponent } from './contato/contato.component';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path: 'sobre', component: SobreComponent},
    {path:'projetos', component:ProjetosComponent},
    {path:'contato', component: ContatoComponent},
    {path: '**', redirectTo: ''} // ==> Redirecionamento para Home caso rota não existir
];
