import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  * as d3 from 'd3';
import { Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
//import { all } from 'q';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewChecked {
  
  ngAfterViewChecked(){
    
    
    this.buildChart2();
  }
  
  ngOnInit() {
    

  }
  

  invoices: Observable<{}>;
  allInvoices: any = [];
  services: any = [];
  displayIt: boolean;
  data: Object[];
  preData: Object[];
  
  name: any;// = localStorage.setItem("username", "davetays");
  constructor(private http: HttpClient, private router: Router) {
      //this.http.get('/api/home', {}).subscribe(res => { this.invoices = res;  console.log(res), (err) => {console.log(err)}})
      this.invoices = this.http.get('/api/home/' + localStorage.getItem('username'),  {});
      //this.allInvoices = this.http.get('/api/home', {});
      this.http.get('/api/home-invoices/',{}).subscribe(res => { this.allInvoices = res; console.log(res), (err) => {console.log(err)}});
      //this.services = this.http.get('/api/home-services/', {});
      this.http.get('/api/home-services/',{}).subscribe(res => { this.services = res; console.log(res), (err) => {console.log(err)}});
      this.displayIt = false;
      this.data = [];
      this.preData = [];
  }
  getPrices(){
    let cost = 0;
    
    
    for(let x = 0; x < this.allInvoices.length; x++){
      console.log("the services from this invoice: " + this.allInvoices[x].services);
      for(let i = 0; i < this.allInvoices[x].services.length; i++){
        //console.log(this.allInvoices[x].services[i]);
        for(let j = 0; j < this.services.length; j++){
          //console.log("looking for: " + this.services[i].name);
          if(this.allInvoices[x].services[i] == this.services[j].name){
            console.log("{name: " + this.allInvoices[x].services[i] + "cost: " + this.services[j].cost + "}");
            this.preData.push({name: this.allInvoices[x].services[i], cost: this.services[j].cost});
          }
        }
      }
    }
    console.log(this.preData);
    console.log('!!!!!!!!!!!!');
    let found = false;
    this.preData.forEach(function(item){
      found = false;
      console.log(item);
      console.log("item above");
      if(this.data.length != 0){
        this.data.forEach(element => {
          if(item['name'] == element['name']){
            element['cost'] += item['cost'];
            found = true;
          }else{
            console.log();
          }
        });
        console.log(item['name']);
      }
      else{
        this.data.push(item);
        found = true;
      }
      if(!found){
        this.data.push(item);
      }
    }, this)
    console.log(this.data);
  }

  toggleChart(){
    this.displayIt = true;
    this.getPrices();
    this.buildChart2();
  }

  buildChart2(){
    
    const margin = 60;
    const width = 800 - 2 * margin;
    const height = 400 - 2 * margin;
    //console.log(this.data[0]['cost'] + "=data");//prints 80
    const svg = d3.select('svg');
    
    const chart = svg.append('g')
    .attr('transform', `translate(${margin}, ${margin})`);
    
    const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 500]);

    const makeYLines = () => d3.axisLeft(yScale)
      .scale(yScale)
      
    chart.append('g')
    .call(d3.axisLeft(yScale));

    const xScale = d3.scaleBand()
    .range([0, width])
    .domain(this.data.map((s) => s['name']))
    .padding(0.2)

    chart.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));    

    const barGroups = chart.selectAll()
      .data(this.data)
      .enter()
      .append('g')

    barGroups
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (g) => xScale(g['name']))
      .attr('y', (g) => yScale(g['cost']))
      .attr('height', (g) => height - yScale(g['cost']))
      .attr('width', xScale.bandwidth())
      .on('mouseenter', function (actual, i) {
        d3.selectAll('.value')
          .attr('opacity', 0)

        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 0.6)
          .attr('x', (a) => xScale(a['name']) - 5)
          .attr('width', xScale.bandwidth() + 10)

        const y = yScale(actual['cost'])

        var line = chart.append('line')
          .attr('id', 'limit')
          .attr('x1', 0)
          .attr('y1', y)
          .attr('x2', width)
          .attr('y2', y)

    barGroups 
      .append('text')
      .attr('class', 'value')
      .attr('x', (a) => xScale(a['name']) + xScale.bandwidth() / 2)
      .attr('y', (a) => yScale(a['cost']) + 30)
      .attr('text-anchor', 'middle')
      .text((a) => `${a['name']}`)
    
    svg
      .append('text')
      .attr('class', 'label')
      .attr('x', -(height / 2) - margin)
      .attr('y', margin / 2.4)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Amount Sold')

    svg.append('text')
      .attr('class', 'label')
      .attr('x', width / 2 + margin)
      .attr('y', height + margin * 1.7)
      .attr('text-anchor', 'middle')
      .text('Products')

    svg.append('text')
      .attr('class', 'title')
      .attr('x', width / 2 + margin)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .text('Amount sold per service/product')

    svg.append('text')
      .attr('class', 'source')
      .attr('x', width - margin / 2)
      .attr('y', height + margin * 1.7)
      .attr('text-anchor', 'start')
      .text('Source: Stack Overflow, 2018')

    
  });

}}
