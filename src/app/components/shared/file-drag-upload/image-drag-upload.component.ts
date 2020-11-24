import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '../modal-window/modal.service';
import {StepForm} from "../../../model/step";

@Component({
  selector: 'app-image-drag-upload',
  templateUrl: './image-drag-upload.component.html',
  styleUrls: ['./image-drag-upload.component.scss']
})
export class ImageDragUploadComponent implements OnInit {
  @Input() stepIndex: number;
  @Input() step: StepForm;

  modalImage: number;
  modalOpened: boolean = false;

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit() {
  }

  onFilesDropped(files: FileList) {
    this.addNewFiles(files);
  }

  onFilesSelected(event: Event) {
    this.addNewFiles((event.target as HTMLInputElement).files);
    // if we do not null and select the same file again the browser will not fire selected event
    (event as any).target.value = null;
  }

  private addNewFiles(fileList: FileList) {
    this.convertFileList(fileList).forEach(f => {
      let reader = new FileReader();
      reader.readAsDataURL(f);

      reader.onload = (event) => {
        if (!this.alreadyContainsImage(f)) {
          this.step.images.push({
            file: f,
            src: reader.result as string
          })
        }
      }
    });
  }

  private alreadyContainsImage(f: File) {
    return this.step.images.some(selection => selection.file.name == f.name);
  }

  private convertFileList(list: FileList): ReadonlyArray<File> {
    const array: File[] = [];
    for (let i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
  }

  openImgModal(img) {
    this.modalOpened = true;
    this.modalImage = this.step.images.indexOf(img);
    this.modalService.open("imageView")
  }

  closeImgModal() {
    this.modalService.close("imageView");
    this.modalOpened = false;
  }

  removeCurrentImage() {
    if (this.modalImage === this.step.images.length - 1) {
      this.step.images.splice(this.modalImage, 1);
      this.modalImage--;
    } else {
      this.step.images.splice(this.modalImage, 1);
    }

    // bug of primeNG -> when we dynamically change length of array to 1, transform does not work properly
    if (this.step.images.length === 1){
      (document.querySelector('#imageView .ui-carousel-items-container') as HTMLElement)
        .style.transform = "translate3d(0px, 0px, 0px)";
      (document.querySelector('app-image-drag-upload .ui-carousel-items-container') as HTMLElement)
        .style.transform = "translate3d(0px, 0px, 0px)";
    }

    if (this.step.images.length === 0) {
      this.closeImgModal();
    }
  }

  setSelectedImage($event: any) {
    this.modalImage = $event.page;
  }
}
