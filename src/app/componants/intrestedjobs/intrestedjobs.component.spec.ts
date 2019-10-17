import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntrestedjobsComponent } from './intrestedjobs.component';

describe('IntrestedjobsComponent', () => {
  let component: IntrestedjobsComponent;
  let fixture: ComponentFixture<IntrestedjobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntrestedjobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntrestedjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
