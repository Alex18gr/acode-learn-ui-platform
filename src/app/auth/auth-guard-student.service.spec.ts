import { TestBed } from '@angular/core/testing';

import { AuthGuardStudentService } from './auth-guard-student.service';

describe('AuthGuardStudentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthGuardStudentService = TestBed.get(
      AuthGuardStudentService
    );
    expect(service).toBeTruthy();
  });
});
