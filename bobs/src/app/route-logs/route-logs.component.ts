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
export class RouteLogsComponent implements OnInit, AfterViewInit {
  logs: string;
  logsArray: String[];
  displayIt: Boolean;
  displayedColumns: String[];

  constructor(private http: HttpClient, private router: Router) { 
    this.http.get('/api/logs', {responseType: 'text'}).subscribe(res => {this.logs = res});
    this.logsArray = [];
    this.displayIt = false;
    this.displayedColumns = ['address', 'date', 'MUSR', 'referrer', 'agent'];
  }

  ngOnInit() {
    
  }

  ngAfterViewInit(){
    
  }

  toggleEdits(){
    this.checkLogs();
    this.displayIt = true;
  }

  checkLogs(){
    var rows = this.logs.split("\n");
      for(let i = 0; i < rows.length; i++){
        rows[i] = this.splitMulti(rows[i], ['- -', ' "']);
        console.log("values after split " + rows[i]);
        console.log(rows[i].length);
        this.logsArray[i] = rows[i];
        console.log(this.logsArray[i]);
      }
      //console.log(this.logs);
    }

    splitMulti(str, tokens){
      var tempChar = tokens[0]; // We can use the first token as a temporary join character
      for(var i = 1; i < tokens.length; i++){
          str = str.split(tokens[i]).join(tempChar);
      }
      str = str.split(tempChar);
      return str;
    }
}
