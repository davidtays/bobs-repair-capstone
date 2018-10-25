import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';



//interfaces

@Injectable()
export class AuthenticationService{
  private token:string;

  constructor(private http: HttpClient, private router: Router){}

  private saveToken(token:string): void{
    localStorage.setItem('mean-token',token);
    this.token = token;
  }

  private getToken(): string{
    if (!this.token){
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }
  // payload
  public getUserDetails(): UserDetails{
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload); // atob decodes Base64
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean{
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
  // API call
  private request(method: 'post'|'get',type:'login'|'register'|'profile', user?: TokenPayload): Observable<any> {
    let base;

    if (method === 'post'){
      base = this.http.post('/api/${type}', user);
    } else {
      base = this.http.get('api${type}', {headers:{Authorization:'Bearer ${this.getToken()'}});
    }
    
    const request =base.pipe(
      map((data:TokenResponse)=>{
        if (data.token){
          this.saveToken(data.token);
        }
        return data;
      })
    );
    return request;
  }
  public register(user: TokenPayload):Observable<any>{
    return this.request('post','register',user);
  }
  public login(user:TokenPayload):Observable<any>{
    return this.request('post','login',user);
  }
  
  public logout(): void{
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }
}




//uses HTTP client inside angular to make http requests to server application
export interface UserDetails{
  _id:string;
  username:string;
  firstName:string;
  lastName:string;
  phoneNumber:string;
  address:string;
  email:string;
  exp:number;
  iat:number;
};

interface TokenResponse{
  token: string;
};

export interface TokenPayload{
  username:string;
  password:string;
  name?:string;
}

// handles 4 methods



