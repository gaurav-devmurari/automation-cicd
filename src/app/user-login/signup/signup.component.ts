import { UserRegistrationService } from './../service/user-registration.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRegistrationDetails } from '../models/user-registration.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userRegistrationService: UserRegistrationService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async signUp() {
    const formData = new FormData();
    formData.append('name', this.signupForm.get('name')?.value);
    formData.append('email', this.signupForm.get('email')?.value);
    formData.append('password', this.signupForm.get('password')?.value);
    const userDetails = formData as unknown as UserRegistrationDetails;
    const isSuccess =
      await this.userRegistrationService.userRegistration(userDetails);
  }
}
