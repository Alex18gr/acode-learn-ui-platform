import { TestBed } from '@angular/core/testing';

import { InstructorCoursesService } from './instructor-courses.service';

describe('InstructorCoursesServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstructorCoursesService = TestBed.get(InstructorCoursesService);
    expect(service).toBeTruthy();
  });
});
