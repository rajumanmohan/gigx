import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentprofileComponent } from './talentprofile.component';

describe('TalentprofileComponent', () => {
  let component: TalentprofileComponent;
  let fixture: ComponentFixture<TalentprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalentprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
