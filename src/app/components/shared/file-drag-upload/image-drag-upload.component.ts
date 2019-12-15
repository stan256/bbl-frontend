import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {ImageSelection} from '../../../model/files';
import {ModalService} from '../modal-window/modal.service';

@Component({
  selector: 'app-image-drag-upload',
  templateUrl: './image-drag-upload.component.html',
  styleUrls: ['./image-drag-upload.component.scss']
})
export class ImageDragUploadComponent implements OnInit {
  @Input() stepTitle;

  imageSelections: Array<ImageSelection> = [];
  private imageInModal: ImageSelection;

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit() {
  }

  onFilesDropped(files: FileList) {
    this.addNewFiles(files);
  }

  onFilesSelected(event: Event) {
    // TODO test what does it do
    this.addNewFiles((event.target as HTMLInputElement).files);
    // if we do not null and select the same file again the browser will not fire selected event
    (event as any).target.value = null;
  }

  private addNewFiles(fileList: FileList) {
    this.convertFileList(fileList).forEach(f => {
      let reader = new FileReader();
      reader.readAsDataURL(f);

      reader.onload = (event) => this.imageSelections.push({
        file: f,
        src: reader.result as string
      })
    });
  }

  private convertFileList(list: FileList): ReadonlyArray<File> {
    const array: File[] = [];
    for (let i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
  }

  openImgModal(img) {
    this.imageInModal = img;
    this.modalService.open("imageView")
  }

  closeImgModal() {
    this.modalService.close("imageView");
    this.imageInModal = null;
  }

  remove() {

  }
}

export interface ImageSelection {
  file: File;
  src: string;
}
