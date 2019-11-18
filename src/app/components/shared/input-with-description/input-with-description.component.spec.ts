import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputWithDescriptionComponent } from './input-with-description.component';

describe('InputWithDescriptionComponent', () => {
  let component: InputWithDescriptionComponent;
  let fixture: ComponentFixture<InputWithDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputWithDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputWithDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
