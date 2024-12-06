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
  selectedImage: File;
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

  onFileSelect(event: Event) {
    const image = event.target as HTMLInputElement;
    if (image.files) {
      this.selectedImage = image.files[0];
    }
  }

  signUp() {
    const formData = new FormData();
    formData.append('name', this.signupForm.get('name')?.value);
    formData.append('email', this.signupForm.get('email')?.value);
    formData.append('password', this.signupForm.get('password')?.value);
    formData.append('image', this.selectedImage);
    if (!this.selectedImage) {
      alert('image requiered');
      return;
    }

    const userDetails = formData as unknown as UserRegistrationDetails;
    this.userRegistrationService
      .userRegistration(userDetails)
      .subscribe((result) => {
        console.log(result);
      });
  }
}
