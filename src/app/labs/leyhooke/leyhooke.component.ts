import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leyhooke',
  templateUrl: './leyhooke.component.html',
  styleUrls: ['./leyhooke.component.scss']
})
export class LeyhookeComponent implements OnInit {

  view: [number, number] = [614, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Population';
  legendTitle: string = 'Years';

  /*colorScheme = {
    { name: "2019", value: '#febb00' },
    { name: "2020", value: '#1dd068' },
    { name: "2021", value: '#1dd068' },
    { name: "2022", value: '#febb00' }
    //domain: ['#5AA454', '#C7B42C', '#AAAAAA']
  };*/

  colorScheme = [
    { name: "verde", value: '#5AA454' },
    { name: "amarillo", value: '#C7B42C' }//,
    //{ name: "gris", value: '#AAAAAA' }
  ]

  multi = [
    {
      "name": "Germany",
      "series": [
        {
          "name": "2010",
          "value": 7300000
        },
        {
          "name": "2011",
          "value": 8940000
        }
      ]
    },
  
    {
      "name": "USA",
      "series": [
        {
          "name": "2010",
          "value": 7870000
        },
        {
          "name": "2011",
          "value": 8270000
        }
      ]
    },
  
    {
      "name": "France",
      "series": [
        {
          "name": "2010",
          "value": 5000002
        },
        {
          "name": "2011",
          "value": 5800000
        }
      ]
    }
  ];

  constructor() {
    //Object.assign(this, { multi })
  }

 onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit(): void {
  }

}
