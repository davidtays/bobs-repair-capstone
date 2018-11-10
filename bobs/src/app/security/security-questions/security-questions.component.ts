import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';

@Component({
  selector: 'app-security-questions',
  templateUrl: './security-questions.component.html',
  styleUrls: ['./security-questions.component.css']
})
export class SecurityQuestionsComponent implements OnInit {
  questions: Observable<{}>;
  questionsChosen: Array<String>;
  answers: Array<String>;
  test: {};
  user: {};
  constructor(private http: HttpClient, private router: Router) { 
    this.questions = this.http.get('/api/security-questions',  {});
    this.questionsChosen = [];
    this.answers = [];
    console.log("inside of the constructor of security Questions");
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
  }
  
  onSubmit(formData){
    console.log(formData);
    for(var key in formData) {
      if(formData[key] != ""){
        console.log(key + " of " + formData[key]);
        this.questionsChosen.push(key);
        this.answers.push(formData[key]);
      }        
    };
    console.log(this.user);
    this.http.post('/api/register', {
      firstname: this.user['firstname'],
      lastname: this.user['lastname'],
      phonenumber: this.user['phonenumber'],
      address: this.user['address'],
      email: this.user['email'],      
      username: this.user['username'],
      password: this.user['password'],
      q1: this.questionsChosen[0],
      q2: this.questionsChosen[1],
      q3: this.questionsChosen[2],
      a1: this.answers[0],
      a2: this.answers[1],
      a3: this.answers[2],
      roles: this.user['roles'],
    }).subscribe(res => {
      this.router.navigate(['/login'/*, res*/]), (err) => {console.log(err)}
    })
  }
}
