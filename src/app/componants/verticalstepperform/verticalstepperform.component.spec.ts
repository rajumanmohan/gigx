import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalstepperformComponent } from './verticalstepperform.component';

describe('VerticalstepperformComponent', () => {
  let component: VerticalstepperformComponent;
  let fixture: ComponentFixture<VerticalstepperformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalstepperformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalstepperformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
