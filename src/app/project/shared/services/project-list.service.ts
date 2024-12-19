import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ProjectList } from '../model/project.model';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { DesignSystemService } from '@design-system/services/design-system.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectListService {
  projectList: ProjectList[];
  private readonly _baseUrl: string;
  constructor(
    private http: HttpClient,
    private toastr: DesignSystemService
  ) {
    this._baseUrl = environment.apiUrl;
  }

  async getUserProjects(
    baseUrl: string,
    token: string
  ): Promise<ProjectList[]> {
    try {
      const res = await lastValueFrom(
        this.http.get<ProjectList[]>(`${baseUrl}v1/project/getUserProjects`)
      );
      this.projectList = res;
      return this.projectList;
    } catch (error) {
      console.log(error);
      console.error('Error fetching projects:', error);
      throw error;
    }
  }

  getProjectDetail(projectId: number): Observable<ProjectList[]> {
    return this.http.get<ProjectList[]>(
      `${this._baseUrl}v1/project/${projectId}`
    );
  }

  async deleteProject(projectId: string): Promise<boolean> {
    try {
      const res = await firstValueFrom(
        this.http.delete(`http://localhost:3000/v1/project/${projectId}`)
      );
      const data = res as number;
      if (data) {
        setTimeout(() => {
          this.toastr.toastr('Project deleted..!', '', 'success', 3000);
        }, 500);

        return true;
      }
    } catch (err) {
      this.toastr.toastr(
        'Project not deleted..!',
        `${err.error.message}`,
        'danger',
        3000
      );
      return false;
    }
    return false;
  }
}
