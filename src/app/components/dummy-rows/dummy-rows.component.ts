import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dummy-rows',
  templateUrl: './dummy-rows.component.html',
  styleUrls: ['./dummy-rows.component.scss']
})
export class DummyRowsComponent implements OnInit {
  @Input() rowsNumber: number = 3;
  private numbers: ReadonlyArray<number>[];

  constructor() {
  }

  ngOnInit() {
  }

}
