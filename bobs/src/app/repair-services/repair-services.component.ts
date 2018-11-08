import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-repair-services',
  templateUrl: './repair-services.component.html',
  styleUrls: ['./repair-services.component.css']
})

export class RepairServicesComponent implements OnInit {

  ngOnInit() { }

  service: any;
  services: Observable<{}>;//any = [];
  displayIt: boolean;
  disabled: boolean;
  cost: number;
  user: any;
  checked: boolean;
  servicesSelected: Array<String> = []
  invoice: any;

  constructor(private http: HttpClient, private router: Router) {
/* WHAT I HAD
    <<<<<<< HEAD
    this.http.post('/api/select', 
    {service: localStorage.getItem('service')}).subscribe(res => 
      { this.service = res; this.service = this.service.name, console.log(res), (err) => {console.log(err)}})
    this.services = []; 
=======
*/
    //this.http.get('/api/repair-services', {}).subscribe(res => { this.services = res;  console.log(res), (err) => {console.log(err)}})
    this.services = this.http.get('/api/repair-services', {});
    this.user = localStorage.getItem('username');
    this.displayIt = false;
    this.disabled = false;
    this.cost=0;
    this.checked = false;

  }

  onSubmit(formData){
    for(var key in formData) {
      if(formData[key] != null && formData[key] != ""){
        //console.log(key + "of" + formData[key]);
        if(key != 'parts' && key != 'labor'){
          var strSplit = key.split('/');
          this.servicesSelected.push(strSplit[0]);
          this.cost = this.cost + parseFloat(strSplit[1]) ;          
        }else{
          this.cost = this.cost + parseFloat(formData[key]);
        }
      }
        
    };
    //create order object
    this.http.post('/api/save-invoice', {
      username: localStorage.getItem('username'),
      labor: formData.labor,
      total: this.cost,
      services: this.servicesSelected
    }).subscribe(res => {
      this.router.navigate(['/home'/*, res*/]), (err) => {console.log(err)}
    })

    console.log(formData);
    console.log(this.servicesSelected);
    console.log(this.cost);
    console.log(this.user);
    //save invoice

    //clear values
    this.servicesSelected = [];
    this.cost = 0;
  }
}