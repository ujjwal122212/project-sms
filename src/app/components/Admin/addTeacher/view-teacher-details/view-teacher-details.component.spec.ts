import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTeacherDetailsComponent } from './view-teacher-details.component';

describe('ViewTeacherDetailsComponent', () => {
  let component: ViewTeacherDetailsComponent;
  let fixture: ComponentFixture<ViewTeacherDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTeacherDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewTeacherDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
