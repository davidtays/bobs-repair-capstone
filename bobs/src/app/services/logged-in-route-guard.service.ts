import { Injectable } from '@angular/core';

import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable, Observer, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoggedInRouteGuardService implements CanActivate{
  public isLoggedIn: boolean = false;

  public redirectUrl: "/select";
  
  
  constructor(private router: Router) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    console.log();
    return this.checkLogin(localStorage.getItem('id'));
  }
  public checkLogin(key: string): boolean {
    if(key == ''){
      return false;
    }else{
      return true;
    }
  }
}
