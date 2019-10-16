import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentsearchComponent } from './talentsearch.component';

describe('TalentsearchComponent', () => {
  let component: TalentsearchComponent;
  let fixture: ComponentFixture<TalentsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalentsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
