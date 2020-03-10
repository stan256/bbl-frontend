import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnToursList } from './own-tours-list.component';

describe('CreatedToursComponent', () => {
  let component: OwnToursList;
  let fixture: ComponentFixture<OwnToursList>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnToursList ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnToursList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
