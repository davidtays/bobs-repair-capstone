import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, AfterViewChecked {
  user: Observable<{}>;
  questions: String[];
  newPassword: String;
  confirmPassword: String;
  confirmed: Boolean;
  constructor(private http: HttpClient, private router: Router) {
    
    this.user = JSON.parse(localStorage.getItem('user'));
    this.questions = [this.user['q1'], this.user['q2'], this.user['q3']];
    this.confirmed = false;
   }
  ngAfterViewChecked(){
    
  }
  ngOnInit() {
  }
  
  onSubmit(formData){
    console.log(formData.newPassword + "\n" + this.newPassword + "\n"
      + formData.confirmPassword + "\n" + this.confirmPassword);
    
    if(formData.newPassword &&  formData.confirmPassword && formData.newPassword == formData.confirmPassword){
      console.log("They Match!! UPDATE THE USER!!!! CLEAR LOCALSTORAGE AND SEND TO LOGIN PAGE");
      console.log(this.user);
      this.user['password'] = this.newPassword;
      console.log(this.user['password']);
      this.http.put('/api/update-password', this.user)
      .subscribe(res => {
        //this.user = res; 
        this.router.navigateByUrl('/login'), (err) => {console.log(err)}
    });
      localStorage.setItem('user', 'test');
      localStorage.setItem('username', 'test');
      //this.router.navigateByUrl('/login');
    }
    else{
      console.log("Your passwords don't match or an input was empty! CHECK THE FORM");
    }

  }


  checkAnswers(formData){
    var userData = JSON.parse(localStorage.getItem('user'));
    console.log(formData[0] + " = " + this.user['a1']);
    if(formData[0] == this.user['a1'] && formData[1] == this.user['a2'] && formData[2] == this.user['a3']){
      this.confirmed = true;
      
    }
    else{
      console.log("forgot the answers?");//????
      this.router.navigateByUrl('/reset');
    }
  }
}
