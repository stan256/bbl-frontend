import {Component, Input, OnInit} from '@angular/core';
import {TourForm} from '../../model/tour';
import {UserService} from '../../services/user.service';
import {User} from '../../model/User';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-tours-list',
  templateUrl: './tours-list.component.html',
  styleUrls: ['./tours-list.component.scss']
})
export class ToursListComponent implements OnInit {

  @Input() tours$: Observable<TourForm[]>;

  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit() {
  }

  getUser(userId: number): Observable<User> {
    return this.userService.getUserById(userId);
  }

}
