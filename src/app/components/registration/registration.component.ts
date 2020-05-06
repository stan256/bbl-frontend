import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {UserService} from '../../services/user.service';
import {AlertService} from '../../alert/alert.service';
import {AuthenticationService} from '../../services/authentication.service';


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
  }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
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
    this.authenticationService.registration(this.registrationForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log("DATA ", data);
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
