import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit, AfterViewChecked {

  users: any;
  user: any;
  roles: String[];
  cursor: number;
  displayIt: boolean;
  constructor(private http: HttpClient, private router: Router) {
    //this.users = this.http.get('/api/get-all-users',  {});
    this.http.get('/api/get-all-users',{}).subscribe(res => { this.users = res;console.log(res), (err) => {console.log(err)}});
    console.log("inside the management constructor");
    console.log(this.user);
    this.displayIt = false;
  }

  ngAfterViewChecked(){

  }
  ngOnInit() {
    this.cursor = 0;
  }

  toggleEdits(){
    this.displayIt = true;
  }
  
  changeUser(){
    this.cursor += 1;

  }

  onSubmit(formData){
    console.log();
    
    if(formData.newPassword &&  formData.confirmPassword && formData.newPassword == formData.confirmPassword){
      console.log("inside of onSubmit");
      console.log(this.user);
      this.http.put('/api/update-user', this.user)
      .subscribe(res => {
        //this.user = res; 
        console.log(res), (err) => {console.log(err)}
    });
      localStorage.setItem('user', 'test');
      localStorage.setItem('username', 'test');
      //this.router.navigateByUrl('/login');
    }
    else{
      console.log("Your passwords don't match or an input was empty! CHECK THE FORM");
    }

  }
}
