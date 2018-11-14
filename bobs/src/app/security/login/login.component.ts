import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../../services/authentication.service';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials:TokenPayload ={
    username:'',
    password:''
  };
  user: any;
  username: String = '';
  password: String = '';
constructor(private auth:AuthenticationService,private router:
  Router, private http: HttpClient){}
  
    /*login(){
      this.auth.login(this.credentials).subscribe(()=>{
        this.router.navigateByUrl('/profile');
      }, (err)=>{
      });
    }*/
    login(formData){
      console.log(formData.username + "=username/" + formData.password + "=password");
      localStorage.setItem('username', formData.username);
      
      this.http.post('/api/login', { username: formData.username, password: formData.password })
        .subscribe(res => {
          this.user = res; 
          localStorage.setItem('user', JSON.stringify(this.user));
          console.log(JSON.parse(localStorage.getItem('user')));
          this.router.navigateByUrl('/home'), (err) => {console.log(err)}
      })
      
    }

}
