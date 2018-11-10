import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, AfterViewChecked {
  username: string;
  constructor(private http: HttpClient, private router: Router) { }
  ngAfterViewChecked(){}
  ngOnInit() {
  }
  onSubmit(formData){
    console.log(formData.username);
    localStorage.setItem('username', this.username);
    this.http.get('/api/reset/' + this.username,{}).subscribe(res => { localStorage.setItem('user', JSON.stringify(res));
    this.router.navigateByUrl('/reset'), (err) => {console.log(err)}})

      
  }
}
