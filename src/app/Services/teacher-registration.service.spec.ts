import { TestBed } from '@angular/core/testing';

import { TeacherRegistrationService } from './teacher-registration.service';

describe('TeacherRegistrationService', () => {
  let service: TeacherRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
