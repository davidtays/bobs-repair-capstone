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
import { LoggedInRouteGuardService } from './services/logged-in-route-guard.service';
// http codes
import { NotFoundComponent } from './not-found/not-found.component';
// import { ServerIssueComponent } from './server-issue/server-issue.component';

const routes : Routes = [
    {path: '', component: LoginComponent},
    {path: 'home', component: HomeComponent, canActivate:[LoggedInRouteGuardService]},
    {path: 'login', component: LoginComponent},
    {path: 'forgot', component: ForgotPasswordComponent},
    {path: 'reset', component: ResetPasswordComponent},
    {path: 'manage', component: ManagementComponent, canActivate:[LoggedInRouteGuardService]},
    
    {path: 'register', component: RegisterComponent},
    {path: 'change-questions', component: ChangeQuestionsComponent, canActivate:[LoggedInRouteGuardService]},
    {path: 'security-questions', component: SecurityQuestionsComponent, canActivate:[LoggedInRouteGuardService]},
    {path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'repair-services', component: RepairServicesComponent, canActivate:[LoggedInRouteGuardService]},
    //{path: 'home', component: HomeComponent/*, canActivate:[LoggedInRouteGuardService]*/},




    //404
    {path: '**', component:NotFoundComponent}
    //{path: 'server', component:ServerIssueComponent}



];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes, {useHash: true}),
    ],
    exports:[
        RouterModule
    ],
    declarations:[]
})
export class AppRoutingModule{}