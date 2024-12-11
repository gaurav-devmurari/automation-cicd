import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ProjectDetails } from '../model/project.model';
import { YamlService } from './yaml.service';

@Injectable({
  providedIn: 'root',
})
export class CreateProjectService {
  public readonly _baseUrl: string;

  constructor(
    private http: HttpClient,
    private YamlService: YamlService
  ) {
    this._baseUrl = environment.apiUrl;
  }

  createProject(newProjectData: ProjectDetails) {
    this.http
      .post(`${this._baseUrl}v1/project/createProject`, newProjectData)
      .subscribe({
        next: (res) => {
          console.log(
            'res after project Successfuly created----------------------------',
            res
          );
          const id = res as { id: string };
          this.YamlService.getYamlFile(id.id);
        },
        error: (error) => {
          console.log(
            'res after project creation Failed----------------------------',
            error
          );
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
          alert('YAML updated successfully');
        },
        error: () => {
          alert('YAML not updated');
        },
      });
  }

  updateYamlEditorData(formData: FormData, projectId: string) {
    this.http
      .patch(`${this._baseUrl}v1/project/updateFile/${projectId}`, formData)
      .subscribe({
        next: () => {
          alert('File Saved Successfully');
        },
        error: (error) => {
          alert(`File is not saved due to ${error}`);
        },
      });
  }
}
