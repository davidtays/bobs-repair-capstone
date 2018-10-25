import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

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



