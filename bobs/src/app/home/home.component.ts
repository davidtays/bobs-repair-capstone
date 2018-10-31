import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  invoices: Observable<{}>;
  constructor(private http: HttpClient, private router: Router) {
      this.invoices = this.http.get('/api/user-invoices', {});
   }

  ngOnInit() {
  }

}
