import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { DesignSystemModule } from '../design-system/design-system.module';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectComponent } from './project.component';
import { AzureComponent } from './shared/components/azure/azure.component';
import { BitbucketComponent } from './shared/components/bitbucket/bitbucket.component';
import { GithubComponent } from './shared/components/github/github.component';
import { GitlabComponent } from './shared/components/gitlab/gitlab.component';
import { Guard } from '../gaurds/guard.guard';

const routes: Routes = [
  {
    path: '',
    component: ProjectComponent,
    children: [
      {
        path: '',
        component: ProjectListComponent,
      },
      {
        path: 'list',
        component: ProjectListComponent,
        canActivate: [Guard]
      },
      {
        path: 'create',
        component: CreateProjectComponent,
      },
      {
        path: 'edit/:projectId',
        component: CreateProjectComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    ProjectComponent,
    ProjectListComponent,
    CreateProjectComponent,
    BitbucketComponent,
    GitlabComponent,
    GithubComponent,
    AzureComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MonacoEditorModule.forRoot(),
    DesignSystemModule,
  ],
})
export class ProjectModule {}
