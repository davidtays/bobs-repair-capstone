import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  days=['Monday 7am - 7pm','Tuesday 7am - 7pm','Wednesday 7am - 7pm','Thursday 7am - 7pm','Friday 7am - 7pm','Saturday 9am - 5pm','Sunday Closed']

  constructor() { }

  ngOnInit() {
  }

}
