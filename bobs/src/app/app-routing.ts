import {RouterModule, Routes} from '@angular/router';
import {CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './security/login/login.component';
import { ForgotPasswordComponent } from './security/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './security/reset-password/reset-password.component';
import { ManagementComponent } from './admin/management/management.component';

const routes : Routes = [
    {path: 'home', component: HomeComponent},
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'forgot', component: ForgotPasswordComponent},
    {path: 'reset', component: ResetPasswordComponent},
    {path: 'manage', component: ManagementComponent}
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