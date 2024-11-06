import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoficationComponent } from './nofication.component';

describe('NoficationComponent', () => {
  let component: NoficationComponent;
  let fixture: ComponentFixture<NoficationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoficationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoficationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
