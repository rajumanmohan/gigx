import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelentregistrationComponent } from './telentregistration.component';

describe('TelentregistrationComponent', () => {
  let component: TelentregistrationComponent;
  let fixture: ComponentFixture<TelentregistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelentregistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelentregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
