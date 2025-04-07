import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common'; // Importe o CommonModule

@Component({
  selector: 'app-projetos',
  standalone: true,
  imports: [
    CommonModule, // Adicione o CommonModule aqui
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './projetos.component.html',
  styleUrl: './projetos.component.scss'
})
export class ProjetosComponent {
  projetos = [
    { nome: 'Projeto 1', descricao: 'Descrição breve do projeto 1.', link: 'https://github.com/seuusuario/projeto1' },
    { nome: 'Projeto 2', descricao: 'Descrição breve do projeto 2.', link: 'https://github.com/seuusuario/projeto2' }
  ];
}