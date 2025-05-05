import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Attendence2Component } from './attendence-2.component';

describe('Attendence2Component', () => {
  let component: Attendence2Component;
  let fixture: ComponentFixture<Attendence2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Attendence2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Attendence2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
