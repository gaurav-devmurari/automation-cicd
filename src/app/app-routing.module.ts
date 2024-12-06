import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'user',
    loadChildren: () =>
      import('./user-login/user-login.module').then((m) => m.UserLoginModule),
  },
  {
    path: 'pipeline',
    loadChildren: () =>
      import('./project/project.module').then((m) => m.ProjectModule),
  },
  {
    path: 'design-system',
    loadChildren: () =>
      import('./design-system/design-system.module').then(
        (m) => m.DesignSystemModule,
      ),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
