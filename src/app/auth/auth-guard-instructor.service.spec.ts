import { TestBed } from '@angular/core/testing';

import { AuthGuardInstructorService } from './auth-guard-instructor.service';

describe('AuthGuardAuthenticatedInstructorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthGuardInstructorService = TestBed.get(AuthGuardInstructorService);
    expect(service).toBeTruthy();
  });
});
