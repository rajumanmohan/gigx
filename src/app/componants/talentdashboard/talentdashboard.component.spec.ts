import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentdashboardComponent } from './talentdashboard.component';

describe('TalentdashboardComponent', () => {
  let component: TalentdashboardComponent;
  let fixture: ComponentFixture<TalentdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalentdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
