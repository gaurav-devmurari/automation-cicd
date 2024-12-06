import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ProjectList } from '../model/project.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YamlService {
  public readonly _baseUrl: string;
  code: string;

  private dataSubject = new Subject<string>();
  data$ = this.dataSubject.asObservable();
  
  constructor(private http: HttpClient) {
    this._baseUrl = environment.apiUrl;
  }

  getYamlFile(id:  string ) {
    this.http.get(`${this._baseUrl}v1/project/${id}`).subscribe(
      (res) => {
        const projectInfo = res as ProjectList
        const fileUrl = projectInfo.fileUrl.substring(1)        
        this.http.get(`${this._baseUrl}${fileUrl}`, { responseType: 'text' }).subscribe((yamlCode) => {
          this.dataSubject.next(yamlCode)
        })
      }
    )
  }



}
