import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {AlertService} from '../alert/alert.service';
import {UserService} from '../auth/user.service';
import {AuthenticationService} from '../auth/authentication.service';


@Component({
  templateUrl: 'registration.component.html',
  selector: 'app-registration'
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.registrationForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    if (this.registrationForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.registration(this.registrationForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
