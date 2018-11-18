import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
//import { MatPaginator } from '@angular/material'
import { Observable, Subscription, of } from 'rxjs';

@Component({
  selector: 'app-change-questions',
  templateUrl: './change-questions.component.html',
  styleUrls: ['./change-questions.component.css']
})
export class ChangeQuestionsComponent implements OnInit, AfterViewInit {
  questions: Observable<{}>;
  displayedColumns: String[];
  displayIt: Boolean;
  newQuestion: String;
  question: any = {};
  ngOnInit() {
  }
  ngAfterViewInit(){}

  constructor(private http: HttpClient, private router: Router) { 
    this.questions = this.http.get('/api/all-questions', {});
    this.displayedColumns = ["question", "buttons"];
    this.displayIt = false;
    //console.log(this.questions);
    //console.log("^^^^^^^^^^^^^^");
    this.newQuestion = "";
  }

  toggleEdits(){
    this.displayIt = true;
  }

  onSubmit(formData){
    console.log(formData.newQuestion);
    this.question = {
      question: formData.newQuestion
    }
    this.http.post('/api/add-questions', this.question).subscribe(res => {
      console.log(res), (err) => {console.log(err)}
    })
    this.newQuestion = "";
    this.questions = this.http.get('/api/all-questions', {});
    
  }

  deleteQuestion(element){
    console.log(element._id);
    this.http.delete("/api/delete-questions/" + element._id)
    .subscribe(res => {
      console.log(res), (err) => {console.log(err)}
    });
    this.questions = this.http.get('/api/all-questions', {});
  }
  editQuestion(element){
    
    console.log(element);//of row
    this.http.put("/api/update-questions", element)
    .subscribe(res => {
      //this.user = res; 
      console.log(res), (err) => {console.log(err)}
    });
  }
}
