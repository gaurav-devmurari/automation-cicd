import { HttpClient } from '@angular/common/http';
import { ProjectList } from '../shared/model/project.model';
import { ProjectListService } from './../shared/services/project-list.service';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
})
export class ProjectListComponent implements OnInit {
  public readonly _baseUrl: string;
  public token: string | null = null;
  projectList: ProjectList[];
  selectedProject: ProjectList;
  isBrowser = false;

  constructor(
    private projectListService: ProjectListService,
    private http: HttpClient,
    private route: Router,
    @Inject(PLATFORM_ID) private platformId: string
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this._baseUrl = environment.apiUrl;
    if (this.isBrowser) {
      this.token = localStorage.getItem('token');
    }
  }

  ngOnInit(): void {
    if (this.token != null) {
      this.projectListService
        .getUserProjects(this._baseUrl, this.token)
        .then((res) => {
          this.projectList = res as ProjectList[];
          this.projectList.filter((data) => {
            const createdTime = new Date(data.createdAt);
            const updatedTime = new Date(data.createdAt);
            data.createdAt = this.formatDateTime(createdTime);
            data.updatedAt = this.formatDateTime(updatedTime);
          });
        });
    } else {
      // this.http
      //   .get(`${this._baseUrl}v1/project/getProjects`)
      //   .subscribe((res) => {
      //     this.projectList = res as ProjectList[];
      //     this.projectList.filter((data) => {
      //       const createdTime = new Date(data.createdAt);
      //       const updatedTime = new Date(data.createdAt);
      //       data.createdAt = this.formatDateTime(createdTime);
      //       data.updatedAt = this.formatDateTime(updatedTime);
      //     });
      //   });
      
    }
  }

  formatDateTime(dateString: Date): string {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-GB');
    const formattedTime = date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    return formattedDate + ' ' + formattedTime;
  }

  getProjectDetails(projectId: string) {
    this.route.navigate([`/pipeline/edit/${projectId}`]);
  }
}
