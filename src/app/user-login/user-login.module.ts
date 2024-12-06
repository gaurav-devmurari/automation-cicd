import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DesignSystemModule } from '../design-system/design-system.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { UserLoginService } from './service/user-login.service';
import { UserRegistrationService } from './service/user-registration.service';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'sign-in',
        component: SigninComponent,
      },
      {
        path: 'sign-up',
        component: SignupComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [SigninComponent, SignupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    DesignSystemModule,
  ],
  providers: [UserLoginService, UserRegistrationService],
})
export class UserLoginModule {}
