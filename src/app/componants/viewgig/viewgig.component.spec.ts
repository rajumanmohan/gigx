import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewgigComponent } from './viewgig.component';

describe('ViewgigComponent', () => {
  let component: ViewgigComponent;
  let fixture: ComponentFixture<ViewgigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewgigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewgigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
