import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpostedgigsComponent } from './viewpostedgigs.component';

describe('ViewpostedgigsComponent', () => {
  let component: ViewpostedgigsComponent;
  let fixture: ComponentFixture<ViewpostedgigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewpostedgigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewpostedgigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
