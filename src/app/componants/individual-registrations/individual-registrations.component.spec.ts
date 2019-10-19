import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualRegistrationsComponent } from './individual-registrations.component';

describe('IndividualRegistrationsComponent', () => {
  let component: IndividualRegistrationsComponent;
  let fixture: ComponentFixture<IndividualRegistrationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualRegistrationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualRegistrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
