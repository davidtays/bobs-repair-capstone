import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
//import { MatPaginator } from '@angular/material'
import { Observable, Subscription, of } from 'rxjs';

@Component({
  selector: 'app-route-logs',
  templateUrl: './route-logs.component.html',
  styleUrls: ['./route-logs.component.css']
})
export class RouteLogsComponent implements OnInit {
  logs: any;
  constructor(private http: HttpClient, private router: Router) { 
    this.http.get('/api/logs', {responseType: 'text'}).subscribe(res => {console.log(res);})
  }

  ngOnInit() {
    
  }

}
