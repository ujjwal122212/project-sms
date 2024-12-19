import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoughtnutRatioTeacherComponent } from './doughtnut-ratio-teacher.component';

describe('DoughtnutRatioTeacherComponent', () => {
  let component: DoughtnutRatioTeacherComponent;
  let fixture: ComponentFixture<DoughtnutRatioTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoughtnutRatioTeacherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoughtnutRatioTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
