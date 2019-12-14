import {Component, Input, OnInit} from '@angular/core';
import {ImageSelection} from '../../../model/files';

@Component({
  selector: 'app-image-drag-upload',
  templateUrl: './image-drag-upload.component.html',
  styleUrls: ['./image-drag-upload.component.scss']
})
export class ImageDragUploadComponent implements OnInit {
  @Input() stepTitle;

  imageSelections: Array<ImageSelection> = [];

  constructor() { }

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
}
