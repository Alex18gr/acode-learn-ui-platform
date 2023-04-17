import { TestBed } from '@angular/core/testing';

import { InstructorResourceService } from './instructor-resource.service';

describe('ResourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstructorResourceService = TestBed.get(
      InstructorResourceService
    );
    expect(service).toBeTruthy();
  });
});
