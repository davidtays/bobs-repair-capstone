import { Injectable } from '@angular/core';


import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable, Observer, Subject } from 'rxjs';
import { json } from 'd3';
import { CheckboxControlValueAccessor } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoggedInRouteGuardService implements CanActivate{
  public isLoggedIn: boolean = false;

  public redirectUrl: "/login";
  
  
  constructor(private router: Router) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    console.log(route.routeConfig.path);
    console.log(localStorage.getItem('username'));
    if(route.routeConfig.path == "manage" || route.routeConfig.path == "logs" || route.routeConfig.path == "change-questions" ){
      if(localStorage.getItem('user') != 'test'){
        var user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
        var roles = user['roles'];
        return this.checkRole(roles);
      }else{
        return false;
      }

    }else if(route.routeConfig.path == "security-questions"){
      return this.checkUser();
    }else{
      return this.checkLogin(localStorage.getItem('username'));
    }
    
  }
  public checkLogin(key: string): boolean {
    if(key == 'test' || ""){
      return false;
    }else{
      return true;
    }
  }

  public checkRole(keys: string[]): boolean {
    if(keys[0] == 'admin' || keys[1] == 'admin'){
      return true;
    }else{
      return false;
    }
  }

  public checkUser(): boolean {
    if(localStorage.getItem('user') == 'test' || localStorage.getItem('user') == ""){
      return false;
    }else{
      return true;
    }
  }
}
