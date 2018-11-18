import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
//import { MatPaginator } from '@angular/material'
import { Observable, Subscription, of } from 'rxjs';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit, AfterViewInit {

  users: Observable<{}>;
  usersArray: any[];

  usersLength: any;
  user: any;
  roles: String[];
  cursor: number;
  displayIt: Boolean;
  displayedColumns: String[];

  dataSource: any;
  ngOnInit() {}
  ngAfterViewInit(){}
  
  constructor(private http: HttpClient, private router: Router) {
    this.users = this.http.get('/api/get-all-users',  {});
    console.log("inside the management constructor");
    this.cursor = 0;
    this.displayIt = false;
    this.usersLength = 0;
    this.displayedColumns = ["firstName", "lastName", "address", "email", "phoneNumber", "roles", "buttons"];
  }

  onRowClicked(row){
    console.log('Row clicked: ', row);
  }

  toggleEdits(){
    this.displayIt = true;
  }
  
  deleteUser(element){
    console.log(element._id);
    this.http.delete("/api/delete-user/" + element._id)
    .subscribe(res => {
      console.log(res), (err) => {console.log(err)}
    });
    this.users = this.http.get('/api/get-all-users',  {});
  }
  editUser(element){
    
    console.log(element);//of row
    this.http.put("/api/update-user", element)
    .subscribe(res => {
      //this.user = res; 
      console.log(res), (err) => {console.log(err)}
    });
  
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
