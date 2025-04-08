import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'income', component: DashboardComponent }, // Substitua por um componente real
  { path: 'expenses', component: DashboardComponent }, // Substitua por um componente real
  { path: '**', redirectTo: '' },
];