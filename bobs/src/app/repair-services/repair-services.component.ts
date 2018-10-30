import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

@Component({
  selector: 'app-repair-services',
  templateUrl: './repair-services.component.html',
  styleUrls: ['./repair-services.component.css']
})

export class RepairServicesComponent implements OnInit {

  ngOnInit() { }

  service: any;
  services: Array<object>;
  displayIt: boolean;
  disabled: boolean;
  cost:any;
  user: any;

  constructor(private http: HttpClient, private router: Router) {
    this.http.post('service/', {service: localStorage.getItem('service')}).subscribe(res => { this.service = res; this.service = this.service.name, console.log(res), (err) => {console.log(err)}})
    this.services = []; 
    this.displayIt = false;
    this.disabled = false;
    this.cost=0;

    }


  onSubmit(formData){

    if(formData.name="Virus Removal"){
      this.cost+29.95
    };

  }
}