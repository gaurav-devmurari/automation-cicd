import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ProjectList } from '../model/project.model';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectListService {
  projectList: ProjectList[];
  private readonly _baseUrl: string;
  constructor(private http: HttpClient) {
    this._baseUrl = environment.apiUrl;
  }

  async getUserProjects(
    baseUrl: string,
    token: string
  ): Promise<ProjectList[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const res = await lastValueFrom(
        this.http.get<ProjectList[]>(`${baseUrl}v1/project/getUserProjects`, {
          headers,
        })
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
    return this.http.get<ProjectList[]>(`${this._baseUrl}v1/project/${projectId}`)
  }
}
