import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../../services/authentication.service';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({

  templateUrl: './login.component.html',

})
export class LoginComponent {
  credentials:TokenPayload ={
    username:'',
    password:''
  };
  username:'';
  password:'';
constructor(private auth:AuthenticationService,private router:
  Router, private http: HttpClient){}
  
    /*login(){
      this.auth.login(this.credentials).subscribe(()=>{
        this.router.navigateByUrl('/profile');
      }, (err)=>{
      });
    }*/
    login(formData){
    this.http.post('/api/login', { username: formData.username, password: formData.password }).subscribe(res => {
      console.log(res.valueOf()), (err) => {console.log(err)}
    })
    }

}
