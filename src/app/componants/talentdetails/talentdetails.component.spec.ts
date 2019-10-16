import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentdetailsComponent } from './talentdetails.component';

describe('TalentdetailsComponent', () => {
  let component: TalentdetailsComponent;
  let fixture: ComponentFixture<TalentdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalentdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
