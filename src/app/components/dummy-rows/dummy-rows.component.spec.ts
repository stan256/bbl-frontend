import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyRowsComponent } from './dummy-rows.component';

describe('DummyRowsComponent', () => {
  let component: DummyRowsComponent;
  let fixture: ComponentFixture<DummyRowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DummyRowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyRowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
