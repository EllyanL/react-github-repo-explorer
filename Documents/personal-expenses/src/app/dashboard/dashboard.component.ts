import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import * as d3 from 'd3';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  // Referências aos contêineres dos gráficos
  @ViewChild('donutChart', { static: false }) donutChartRef!: ElementRef;
  @ViewChild('barChart', { static: false }) barChartRef!: ElementRef;

  // Dados da Tabela
  displayedColumns: string[] = ['date', 'description', 'category', 'amount'];
  transactions = new MatTableDataSource([
    { date: '12/20/2023', description: 'Whole Foods', category: 'Groceries', amount: '-$150.00' },
    { date: '12/19/2023', description: 'Amazon', category: 'Shopping', amount: '-$50.00' },
    { date: '12/15/2023', description: 'Rent', category: 'Housing', amount: '-$950.00' },
    { date: '12/10/2023', description: 'Movie Theater', category: 'Entertainment', amount: '-$45.00' },
  ]);

  // Dados para os gráficos
  donutData = [
    { label: 'Spent', value: 1500 },
    { label: 'Remaining', value: 1200 },
  ];

  barData = [
    { category: 'Groceries', value: 150, color: '#42A5F5' },
    { category: 'Shopping', value: 50, color: '#26C6DA' },
    { category: 'Housing', value: 950, color: '#AB47BC' },
    { category: 'Entertainment', value: 45, color: '#FF7043' },
  ];

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.createDonutChart();
    this.createBarChart();
  }

  // Gráfico de Rosca (Donut Chart)
  createDonutChart(): void {
    const width = 200;
    const height = 200;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select(this.donutChartRef.nativeElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal<string>()
      .domain(this.donutData.map(d => d.label))
      .range(['#42A5F5', '#B0BEC5']);

    const pie = d3.pie<any>()
      .value((d: any) => d.value);

    const arc = d3.arc<any>()
      .innerRadius(radius * 0.7) // Tamanho do "buraco" no centro
      .outerRadius(radius);

    const arcs = svg
      .selectAll('.arc')
      .data(pie(this.donutData))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', (d: any) => color(d.data.label));
  }

  // Gráfico de Barras
  createBarChart(): void {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3
      .select(this.barChartRef.nativeElement)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const x = d3.scaleBand()
      .domain(this.barData.map(d => d.category))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(this.barData, d => d.value) as number])
      .nice()
      .range([height, 0]);

    svg
      .selectAll('.bar')
      .data(this.barData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.category) as number)
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.value))
      .attr('fill', d => d.color);

    // Eixo X
    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // Eixo Y
    svg
      .append('g')
      .call(d3.axisLeft(y));
  }
}