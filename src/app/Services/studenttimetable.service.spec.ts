import { TestBed } from '@angular/core/testing';

import { StudenttimetableService } from './studenttimetable.service';

describe('StudenttimetableService', () => {
  let service: StudenttimetableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudenttimetableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
