import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteLogsComponent } from './route-logs.component';

describe('RouteLogsComponent', () => {
  let component: RouteLogsComponent;
  let fixture: ComponentFixture<RouteLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
