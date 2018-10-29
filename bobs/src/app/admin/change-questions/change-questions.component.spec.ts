import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeQuestionsComponent } from './change-questions.component';

describe('ChangeQuestionsComponent', () => {
  let component: ChangeQuestionsComponent;
  let fixture: ComponentFixture<ChangeQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
