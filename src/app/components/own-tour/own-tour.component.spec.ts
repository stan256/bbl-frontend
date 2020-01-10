import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnTourComponent } from './own-tour.component';

describe('OwnTourComponent', () => {
  let component: OwnTourComponent;
  let fixture: ComponentFixture<OwnTourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnTourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
