import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTourComponent } from './search-tour.component';

describe('SearchTourComponent', () => {
  let component: SearchTourComponent;
  let fixture: ComponentFixture<SearchTourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
