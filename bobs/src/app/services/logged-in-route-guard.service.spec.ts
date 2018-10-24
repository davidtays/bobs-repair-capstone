import { TestBed, inject } from '@angular/core/testing';

import { LoggedInRouteGuardService } from './logged-in-route-guard.service';

describe('LoggedInRouteGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggedInRouteGuardService]
    });
  });

  it('should be created', inject([LoggedInRouteGuardService], (service: LoggedInRouteGuardService) => {
    expect(service).toBeTruthy();
  }));
});
