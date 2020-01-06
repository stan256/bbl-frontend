import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedToursComponent } from './created-tours.component';

describe('CreatedToursComponent', () => {
  let component: CreatedToursComponent;
  let fixture: ComponentFixture<CreatedToursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedToursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
