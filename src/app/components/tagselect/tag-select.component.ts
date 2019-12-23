import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {finalize, map, take, tap} from 'rxjs/operators';
import {TagService} from '../../services/tag.service';
import {Tag} from '../../shared/common.types';
import {AlertService} from '../../alert/alert.service';

// todo do I need this component ? It is already not in use

@Component({
  selector: 'app-tag-select',
  templateUrl: './tag-select.component.html',
  styleUrls: ['./tag-select.component.scss']
})
export class TagSelectComponent implements OnInit {

  isLoading: boolean = false;
  tagsInHint: ReadonlyArray<Tag> = [];
  selectedTags: Array<Tag> = [];

  @ViewChild('tagInput', {static: true}) tagInput:ElementRef;

  constructor(
    private tagService: TagService,
    private alertService: AlertService
  ) { }

  ngOnInit() {

  }

  addTag(tag: Tag) {
    this.selectedTags.push(tag);
    this.clearInput();
  }

  deleteTag(tag: Tag) {
    this.selectedTags = this.selectedTags.filter(t => t != tag);
  }

  updateHint() {
    if (this.tagInputEmpty()) {
      this.tagsInHint = [];
      return;
    }

    const value = this.tagInput.nativeElement.value;
    this.isLoading = true;
    this.tagService.getTags(value).pipe(
      take(1),
      map(a => a.filter(t => this.selectedTags.indexOf(t) === -1)), // filter tags which are already selected
      tap(v => this.tagsInHint = v),
      finalize(() => this.isLoading = false)
    ).subscribe();
  }

  tagInputEmpty() {
    return this.tagInput.nativeElement.value === "";
  }

  clearInput() {
    this.tagInput.nativeElement.value = "";
    this.updateHint();
  }

  createOwnTag() {
    this.tagService.createTag(this.tagInput.nativeElement.value)
      .subscribe(tag => {
        this.addTag(tag);
        this.alertService.success(`Tag ${tag} was successfully created.`)
      })
  }
}
