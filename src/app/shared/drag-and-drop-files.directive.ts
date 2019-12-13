import {Directive, EventEmitter, HostBinding, HostListener, Output} from "@angular/core";

@Directive({
  selector: '[app-drag-and-drop]'
})
export class DragAndDropFilesDirective {

  @Output() fileDropped = new EventEmitter<FileList>();

  @HostBinding('class.drag-over') dragOverClass: boolean = false;

  @HostListener('dragover', ['$event']) onDragOver(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();
    this.dragOverClass = true;
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();
    this.dragOverClass = false;
  }

  @HostListener('drop', ['$event']) public ondrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.dragOverClass = false;
    let files = evt.dataTransfer!.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }
}
