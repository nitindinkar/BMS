import { Component, OnInit, ViewChild } from '@angular/core';
import {Chart, ChartConfiguration, ChartItem, registerables} from 'node_modules/chart.js'
import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit{
  ngOnInit(): void {
    $.getScript('assets/main.js');
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload');
      location.reload();
      console.log('Diwakar');
    } else {
      localStorage.removeItem('foo');
      console.log('Chauha ');
      localStorage.setItem('user_role', 'Admin');
    }

    $('.count').each(function () {
      $(this).prop('Counter', 0).animate({
        Counter: $(this).text()
      }, {
        duration: 2000,
        easing: 'swing',
        step: function (now: any) {
          $(this).text(Math.ceil(now));
        }
      });
    });
    this.ngAfterViewInit();
  }


  ngAfterViewInit():void {
    Chart.register(...registerables);
    const data = {
      labels: ['OE','SM','WS','OT','DT','RT','PU','PL','AP','MW', 'PS', 'ME', 'IT'],
      datasets: [{
        label: 'Expendeture(Lakhs)',
        backgroundColor: 'rgba(60,141,188,0.9)',
        borderColor: 'rgba(60,141,188,0.8)',
        pointRadius: false,
        pointColor: '#3b8bba',
        pointStrokeColor: 'rgba(60,141,188,1)',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(60,141,188,1)',
        data: [58, 68, 40, 59, 86, 67, 90, 70, 75, 70, 80, 55, 66]
      },
    {
      label: 'Allocated(Lakhs)',
      backgroundColor: 'rgba(210, 214, 222, 1)',
      borderColor: 'rgba(210, 214, 222, 1)',
      pointRadius: false,
      pointColor: 'rgba(210, 214, 222, 1)',
      pointStrokeColor: '#c1c7d1',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(220,220,220,1)',
      data: [38, 45, 50, 39, 46, 57, 60, 50, 65, 60, 60, 35, 46]
  
    }
    ]
};
const options = {
  maintainAspectRatio: false,
  responsive: true,
  legend: {
    display: false
  },
  scales: {
    y: {
      beginAtZero: true,
      display: true
    }
  }
}
const config: ChartConfiguration = {
  type: 'bar',
  data: data,
  options: options
}
const chartItem: ChartItem = document.getElementById('my-chart') as ChartItem
new Chart(chartItem, config)



const data2 = {
  labels: ['CGHQ','RHQ(W)','RHQ(NW)','RHQ(NE)','RHQ(E)','RHQ(A&N)'],
  datasets: [{
    label: 'Expendeture(Lakhs)',
    backgroundColor: 'rgba(60,141,188,0.9)',
    borderColor: 'rgba(60,141,188,0.8)',
    pointRadius: false,
    pointColor: '#3b8bba',
    pointStrokeColor: 'rgba(60,141,188,1)',
    pointHighlightFill: '#fff',
    pointHighlightStroke: 'rgba(60,141,188,1)',
    data: [58, 68, 40, 59, 86, 67]
  },
{
  label: 'Allocated(Lakhs)',
  backgroundColor: 'rgba(210, 214, 222, 1)',
  borderColor: 'rgba(210, 214, 222, 1)',
  pointRadius: false,
  pointColor: 'rgba(210, 214, 222, 1)',
  pointStrokeColor: '#c1c7d1',
  pointHighlightFill: '#fff',
  pointHighlightStroke: 'rgba(220,220,220,1)',
  data: [38, 45, 50, 39, 46, 57]

}
]
};
const options2 = {
  maintainAspectRatio: false,
  responsive: true,
  legend: {
    display: false
  },
  scales: {
    y: {
      beginAtZero: true,
      display: true
    }
  }
}
const config2: ChartConfiguration = {
  type: 'bar',
  data: data2,
  options: options2
}

const chartItem2: ChartItem = document.getElementById('my-chart2') as ChartItem
new Chart(chartItem2, config2)
}

}
