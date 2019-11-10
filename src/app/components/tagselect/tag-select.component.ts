import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {finalize, map, tap} from 'rxjs/operators';
import {TagService} from '../../services/tag.service';
import {Tag} from '../../shared/common.types';

@Component({
  selector: 'app-tag-select',
  templateUrl: './tag-select.component.html',
  styleUrls: ['./tag-select.component.scss']
})
export class TagSelectComponent implements OnInit {
  isLoading: boolean = false;
  tagsInHint: ReadonlyArray<Tag> = [];
  selectedTags: Array<Tag> = [];

  @Output() selectedTagsEmitter = new EventEmitter<ReadonlyArray<Tag>>();

  @ViewChild('tagInput', {static: true}) tagInput:ElementRef;

  constructor(
    private tagService: TagService
  ) { }

  ngOnInit() {

  }

  addTag(tag: Tag) {
    this.selectedTags.push(tag);
    this.tagsInHint = this.tagsInHint.filter(t => t != tag);
  }

  updateHint() {
    if (this.inputIsEmpty()) {
      this.tagsInHint = [];
      return;
    }

    // todo no tags fits your request. you can add a new one.
    const value = this.tagInput.nativeElement.value;
    this.isLoading = true;
    this.tagService.getTags(value).pipe(
      map(a => a.filter(t => this.selectedTags.indexOf(t) === -1)),
      tap(v => this.tagsInHint = v),
      finalize(() => this.isLoading = false)
    ).subscribe();
  }

  inputIsEmpty() {
    return this.tagInput.nativeElement.value === "";
  }
}
