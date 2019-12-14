import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDragUploadComponent } from './image-drag-upload.component';

describe('FileDragUploadComponent', () => {
  let component: ImageDragUploadComponent;
  let fixture: ComponentFixture<ImageDragUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageDragUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageDragUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
