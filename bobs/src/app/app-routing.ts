import {RouterModule, Routes} from '@angular/router';
import {CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './security/login/login.component';
import { ForgotPasswordComponent } from './security/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './security/reset-password/reset-password.component';
import { ManagementComponent } from './admin/management/management.component';

import { RegisterComponent } from './security/register/register.component';

import { ChangeQuestionsComponent } from './admin/change-questions/change-questions.component';
import { SecurityQuestionsComponent } from './security/security-questions/security-questions.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { RepairServicesComponent } from './repair-services/repair-services.component';


const routes : Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'forgot', component: ForgotPasswordComponent},
    {path: 'reset', component: ResetPasswordComponent},
    {path: 'manage', component: ManagementComponent},
    
    {path: 'register', component: RegisterComponent},

    {path: 'manage', component: ManagementComponent},
    {path: 'change-questions', component: ChangeQuestionsComponent},
    {path: 'security-questions', component: SecurityQuestionsComponent},
    {path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'repair-services', component: RepairServicesComponent},

];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes, {useHash: true})
    ],
    exports:[
        RouterModule
    ],
    declarations:[]
})
export class AppRoutingModule{}