import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  * as d3 from 'd3';
import { Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ngOnInit() {
    
    this.getPrices();
    
  }

  invoices: Observable<{}>;
  services: any = [];
  displayIt: boolean;
  //data: number[];
  
  name: any = localStorage.setItem("username", "davetays");
  constructor(private http: HttpClient, private router: Router) {
      //this.http.get('/api/home', {}).subscribe(res => { this.invoices = res;  console.log(res), (err) => {console.log(err)}})
      this.invoices = this.http.get('/api/home/' + localStorage.getItem('username'),  {});
      //this.services = this.http.get('/api/home-services/', {});
      this.http.get('/api/home-services/',{}).subscribe(res => { this.services = res; console.log(res), (err) => {console.log(err)}});
      this.displayIt = false;
  }
  getPrices(){
  
    for(let i = 0; i < this.services.length; i++){
      console.log(this.services[i].name);
      console.log(this.services[i].cost);
    }
  }

  toggleChart(){
    this.displayIt = true;
  }
  buildChart(){
    var data = [80, 120, 60, 150,200];
    var svgWidth = 500, svgHeight = 200, barPadding = 5;
    var barWidth = (svgWidth / data.length);

    var svg = d3.select('svg')
          .attr('width', svgWidth)
          .attr('height', svgHeight);
    svg.selectAll("rect")
          .data(data)
          .enter()
          .append('rect')
          .attr("y", function(d){
            return svgHeight - d
          })
          .attr("height", function(d) {
            return d
          })
          .attr("width", barWidth - barPadding)
          .attr("fill", "red")
          .attr("transform", function(d, i){
            var translate = [barWidth * i, 0];
            return "translate(" + translate + ")";
          })
  }
}
