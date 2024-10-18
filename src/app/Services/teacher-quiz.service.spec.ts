import { TestBed } from '@angular/core/testing';

import { TeacherQuizService } from './teacher-quiz.service';

describe('TeacherQuizService', () => {
  let service: TeacherQuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherQuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
