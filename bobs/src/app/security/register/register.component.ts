import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../../services/authentication.service';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl:'./register.component.html',
  styleUrls: ['./register.component.css']
  
})
export class RegisterComponent {

  credentials: TokenPayload={
    username:'',
    password:'',  
  };
  user: any = {};

  constructor(private http: HttpClient, private auth:AuthenticationService, private router: Router){
    
  }

  /*register(){
    this.auth.register(this.credentials).subscribe(()=>{
      this.router.navigateByUrl('/profile');
    }, (err) =>{
      console.error(err);
    });
  }*/
  register(formData){
    this.user = {
      firstname: formData.firstName,
      lastname: formData.lastName,
      phonenumber: formData.phoneNumber,
      address: formData.address,
      email: formData.email,
      username: formData.userName,
      password: formData.password,
      roles:['standard']
    }
    localStorage.setItem('user', JSON.stringify(this.user));
    /*this.http.post('/api/register', {
      firstname: formData.firstName,
      lastname: formData.lastName,
      phonenumber: formData.phoneNumber,
      email: formData.email,
      username: formData.userName,
      password: formData.password
    }).subscribe(res => {*/
      this.router.navigate(['/security-questions'/*, res*/]), (err) => {console.log(err)}
    //})
  }
}
