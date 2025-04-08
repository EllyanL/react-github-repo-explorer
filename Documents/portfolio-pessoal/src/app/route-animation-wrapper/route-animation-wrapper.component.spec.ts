import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteAnimationWrapperComponent } from './route-animation-wrapper.component';

describe('RouteAnimationWrapperComponent', () => {
  let component: RouteAnimationWrapperComponent;
  let fixture: ComponentFixture<RouteAnimationWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteAnimationWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteAnimationWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
