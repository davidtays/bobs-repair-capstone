import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit, AfterViewChecked {

  users: Observable<{}>;
  user: any;
  roles: String[];

  constructor(private http: HttpClient, private router: Router) {
    this.users = this.http.get('/api/home/' + localStorage.getItem('username'),  {});
  }

  ngAfterViewChecked(){

  }
  ngOnInit() {

  }
  
  changeUser(){

  }
}
