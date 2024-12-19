import { UserRegistrationService } from './../service/user-registration.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRegistrationDetails } from '../models/user-registration.model';
import { LoaderService } from '@common-services/loader.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userRegistrationService: UserRegistrationService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async signUp() {
    this.loader.show();
    const body = {
      name: this.signupForm.get('name')?.value,
      email: this.signupForm.get('email')?.value,
      password: this.signupForm.get('password')?.value,
    };
    const userDetails = body as unknown as UserRegistrationDetails;
    const isSuccess =
      await this.userRegistrationService.userRegistration(userDetails);
    this.loader.hide();
  }
}
