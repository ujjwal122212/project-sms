import { TestBed } from '@angular/core/testing';

import { StudentAdmissionService } from './student-admission.service';

describe('StudentAdmissionService', () => {
  let service: StudentAdmissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentAdmissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
