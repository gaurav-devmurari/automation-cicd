import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ProjectDetails, ProjectList } from '../model/project.model';
import { YamlService } from './yaml.service';
import { DesignSystemService } from '@design-system/services/design-system.service';
import { LoaderService } from '@common-services/loader.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CreateProjectService {
  public readonly _baseUrl: string;
  userId: string;
  constructor(
    private http: HttpClient,
    private YamlService: YamlService,
    private toastr: DesignSystemService,
    private loader: LoaderService,
    private router: Router
  ) {
    this._baseUrl = environment.apiUrl;
  }

  createProject(newProjectData: ProjectDetails) {
    this.loader.show();
    this.http
      .post(`${this._baseUrl}v1/project/createProject`, newProjectData)
      .subscribe({
        next: (res) => {
          console.log(res);
          const response = res as { id: string; userId: string };
          this.YamlService.getYamlFile(response.id);
          this.toastr.toastr('Pipeline created !', ``, 'success', 3000);
        },
        error: (err) => {
          this.toastr.toastr(
            'Failed to Create Pipeline!',
            `${err.error.message}`,
            'danger',
            3000
          );
          this.loader.hide();
        },
      });
  }

  updateYamlFormData(projectId: string, editedProjectData: ProjectDetails) {
    this.http
      .patch(`${this._baseUrl}v1/project/${projectId}`, editedProjectData, {
        headers: { 'Content-Type': 'application/json' },
      })
      .subscribe({
        next: () => {
          this.toastr.toastr(
            'Success',
            'Pipeline updated successfully',
            'success',
            3000
          );
        },
        error: () => {
          this.toastr.toastr(
            'Failed to Update',
            'Pipeline update failded',
            'danger',
            3000
          );
        },
      });
  }

  updateYamlEditorData(formData: FormData, projectId: string) {
    this.toastr.toastr('File Saved', 'YAML manually updated', 'success', 3000);
    this.loader.show();
    this.http
      .patch(`${this._baseUrl}v1/project/updateFile/${projectId}`, formData)
      .subscribe({
        next: () => {
          this.loader.hide();
          this.toastr.toastr('File Saved Successfully', '', 'success', 3000);
        },
        error: (error) => {
          alert(`File is not saved due to ${error}`);
          this.loader.hide();
        },
      });
  }
  cookieId: string;
  getcookieId() {
    return this.cookieId;
  }

  createProjectWithoutToken(newProjectData: ProjectDetails) {
    this.loader.show();
    this.http
      .post(
        `${this._baseUrl}v1/project/createProjectWithOutLogIn`,
        newProjectData
      )
      .subscribe({
        next: (res) => {
          const projectDetails = res as ProjectList;
          this.YamlService.getYamlFile(
            projectDetails.id,
            projectDetails.cookieId
          );
          this.toastr.toastr('Pipeline created !', ``, 'success', 3000);
        },
        error: (err) => {
          this.toastr.toastr(
            'Failed to Create Pipeline!',
            `${err.error.message}`,
            'danger',
            3000
          );
          this.loader.hide();
        },
      });
  }
}
