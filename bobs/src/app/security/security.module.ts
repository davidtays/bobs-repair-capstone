import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeQuestionsComponent } from './change-questions/change-questions.component';
import { SecurityQuestionsComponent } from './security-questions/security-questions.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ChangeQuestionsComponent, SecurityQuestionsComponent]
})
export class SecurityModule { }
