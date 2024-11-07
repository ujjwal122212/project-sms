import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubjectTopicComponent } from './add-subject-topic.component';

describe('AddSubjectTopicComponent', () => {
  let component: AddSubjectTopicComponent;
  let fixture: ComponentFixture<AddSubjectTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSubjectTopicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSubjectTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
