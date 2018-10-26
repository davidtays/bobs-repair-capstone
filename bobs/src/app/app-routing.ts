import {RouterModule, Routes} from '@angular/router';
import {CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './security/login/login.component';
import { ForgotPasswordComponent } from './security/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './security/reset-password/reset-password.component';
import { RegisterComponent } from './register/register.component';
import { ManagementComponent } from './admin/management/management.component';
import { ChangeQuestionsComponent } from './security/change-questions/change-questions.component';
import { SecurityQuestionsComponent } from './security/security-questions/security-questions.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

const routes : Routes = [
    {path: 'home', component: HomeComponent},
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'forgot', component: ForgotPasswordComponent},
    {path: 'reset', component: ResetPasswordComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'manage', component: ManagementComponent},
    {path: 'change-questions', component: ChangeQuestionsComponent},
    {path: 'security-questions', component: SecurityQuestionsComponent},
    {path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactComponent},
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