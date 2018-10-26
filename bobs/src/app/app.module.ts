import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule} from './app-routing';
import {RouterModule, Routes} from '@angular/router';
import { MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatButtonToggleModule, MatOptionModule, MatSelectModule, MatTableModule, MatRadioGroup, MatRadioButton, MatRippleModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import { LoggedInRouteGuardService } from './services/logged-in-route-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './security/login/login.component';
import { ForgotPasswordComponent } from './security/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './security/reset-password/reset-password.component';
import { ChangeQuestionsComponent } from './security/change-questions/change-questions.component';
import { ManagementComponent } from './admin/management/management.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { SecurityQuestionsComponent } from './security/security-questions/security-questions.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    SecurityQuestionsComponent,
    ResetPasswordComponent,
    ChangeQuestionsComponent,
    ManagementComponent,
    MatRadioGroup,
    MatRadioButton,
    AboutComponent,
    ContactComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,     
    MatCardModule,
    MatMenuModule,
    MatCheckboxModule,
    MatRippleModule,
    MatButtonToggleModule,
    MatOptionModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [LoggedInRouteGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
