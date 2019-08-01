import { TestBed } from '@angular/core/testing';

import { AuthGuardHomeService } from './auth-guard-home.service';

describe('AuthGuardHomeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthGuardHomeService = TestBed.get(AuthGuardHomeService);
    expect(service).toBeTruthy();
  });
});
