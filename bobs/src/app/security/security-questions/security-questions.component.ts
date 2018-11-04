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


  constructor(private http: HttpClient, private router: Router) { 
    this.questions = this.http.get('/api/security-questions',  {});
      
  }

  ngOnInit() {
  }
  
  onSubmit(formData){
    console.log(formData);
  }
}
