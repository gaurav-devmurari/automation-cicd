import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ProjectList } from '../model/project.model';
import { Subject } from 'rxjs';
import { LoaderService } from '@common-services/loader.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class YamlService {
  public readonly _baseUrl: string;
  private token: string;
  code: string;
  platformId: string;

  private dataSubject = new Subject<string>();
  data$ = this.dataSubject.asObservable();

  constructor(
    private http: HttpClient,
    private loader: LoaderService,
    private route: Router
  ) {
    this._baseUrl = environment.apiUrl;
  }

  setToken(token: string) {
    this.token = token;
  }

  getYamlFile(id: string, cookieId?: string) {
    this.http.get(`${this._baseUrl}v1/project/${id}`).subscribe((res) => {
      console.log(res);
      const projectInfo = res as ProjectList;
      console.log(projectInfo);
      const fileUrl = projectInfo.fileUrl.substring(1);
      this.http
        .get(`${this._baseUrl}${fileUrl}`, { responseType: 'text' })
        .subscribe((yamlCode) => {
          this.dataSubject.next(yamlCode);
          this.route.navigate([`/pipeline/edit/${id}`]);
          this.loader.hide();
        });
    });
  }
}
