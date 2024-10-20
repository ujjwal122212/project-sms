import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuizSubjectComponent } from './add-quiz-subject.component';

describe('AddQuizSubjectComponent', () => {
  let component: AddQuizSubjectComponent;
  let fixture: ComponentFixture<AddQuizSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddQuizSubjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddQuizSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
