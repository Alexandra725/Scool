import { TestBed } from '@angular/core/testing';

import { CoursesServicesService } from './courses-services.service';

describe('CoursesServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoursesServicesService = TestBed.get(CoursesServicesService);
    expect(service).toBeTruthy();
  });
});
