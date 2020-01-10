import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnStepComponent } from './own-step.component';

describe('OwnStepComponent', () => {
  let component: OwnStepComponent;
  let fixture: ComponentFixture<OwnStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
