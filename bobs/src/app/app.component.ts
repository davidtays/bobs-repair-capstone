import { Component } from '@angular/core';
import {AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  
  constructor(public auth:AuthenticationService, private router: Router){
    
  }
  ngOnInit(){
    localStorage.setItem('username', 'test');
    localStorage.setItem('user', 'test');
  }
  logout(){
    localStorage.setItem('username', 'test');
    localStorage.setItem('user', 'test');
    this.router.navigate(['/login']);
  }
  
}
