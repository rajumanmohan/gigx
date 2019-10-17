import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateajobalertComponent } from './createajobalert.component';

describe('CreateajobalertComponent', () => {
  let component: CreateajobalertComponent;
  let fixture: ComponentFixture<CreateajobalertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateajobalertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateajobalertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
