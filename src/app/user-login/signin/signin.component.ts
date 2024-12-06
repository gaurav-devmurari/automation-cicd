import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLoginService } from '../service/user-login.service';
import { UserLogin } from '../models/user-login.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userLoginService: UserLoginService,
    private route: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    const model = this.loginForm.value as UserLogin;
    this.userLoginService.login(model).subscribe((data) => {
      localStorage.setItem('token', data.access_token);
      if (data.access_token != null || undefined) {
        this.route.navigate(['/pipeline/list']);
      }
    });
  }
}
