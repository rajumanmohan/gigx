import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostagigComponent } from './postagig.component';

describe('PostagigComponent', () => {
  let component: PostagigComponent;
  let fixture: ComponentFixture<PostagigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostagigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostagigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
