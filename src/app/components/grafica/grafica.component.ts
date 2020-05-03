import { Component, OnInit } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';

import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../../services/websoket.service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {

  public barChartLabels: Label[] = ['Pregunta 1', 'Pregunta 2', 'pregunta 3', 'Pregunta 4'];

  public barChartType: ChartType = 'bar';

  public barChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0], label: 'Preguntas' }
  ];

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  constructor(
    private http: HttpClient,
    public wsService: WebsocketService
  ) { }

  ngOnInit() {

    this.getData();
    this.escucharSocket();

  }

  getData(){
    this.http.get('http://localhost:5000/graficaBarra')
    .subscribe( (data: any) => this.barChartData = data);
  }

  escucharSocket(){
    this.wsService.listen('cambio-graficaBarra')
    .subscribe( (data: any) => {
      
      console.log('Socket:',  data);
      this.barChartData = data;
    });
  }

}
