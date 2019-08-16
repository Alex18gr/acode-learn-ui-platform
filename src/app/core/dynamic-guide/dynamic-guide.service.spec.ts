import { TestBed } from '@angular/core/testing';

import { DynamicGuideService } from './dynamic-guide.service';

describe('DynamicGuideService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DynamicGuideService = TestBed.get(DynamicGuideService);
    expect(service).toBeTruthy();
  });
});
