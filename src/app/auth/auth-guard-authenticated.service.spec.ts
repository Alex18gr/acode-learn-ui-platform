import { TestBed } from '@angular/core/testing';

import { AuthGuardAuthenticatedService } from './auth-guard-authenticated.service';

describe('AuthGuardAuthenticatedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthGuardAuthenticatedService = TestBed.get(AuthGuardAuthenticatedService);
    expect(service).toBeTruthy();
  });
});
