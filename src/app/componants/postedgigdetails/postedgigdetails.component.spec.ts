import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostedgigdetailsComponent } from './postedgigdetails.component';

describe('PostedgigdetailsComponent', () => {
  let component: PostedgigdetailsComponent;
  let fixture: ComponentFixture<PostedgigdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostedgigdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostedgigdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
