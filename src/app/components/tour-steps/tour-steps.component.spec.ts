import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourStepsComponent } from './tour-steps.component';

describe('TourStepsComponent', () => {
  let component: TourStepsComponent;
  let fixture: ComponentFixture<TourStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
