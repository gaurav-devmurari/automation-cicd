/* eslint-disable @typescript-eslint/no-unused-expressions */
import { FormBuilder, FormGroup } from '@angular/forms';
import { Project, Repository } from '../shared/model/project.enum';
import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { CreateProjectService } from '../shared/services/create-project.service';
import { ProjectDetails, ProjectList } from '../shared/model/project.model';
import { isPlatformBrowser } from '@angular/common';
import { BitbucketComponent } from '../shared/components/bitbucket/bitbucket.component';
import { GitlabComponent } from '../shared/components/gitlab/gitlab.component';
import { GithubComponent } from '../shared/components/github/github.component';
import { AzureComponent } from '../shared/components/azure/azure.component';
import { ActivatedRoute } from '@angular/router';
import { ProjectListService } from '../shared/services/project-list.service';
import { YamlService } from '../shared/services/yaml.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss',
})
export class CreateProjectComponent implements OnInit {
  @ViewChild('bitBucket') bitBucket: BitbucketComponent;
  @ViewChild('gitLab') gitLab: GitlabComponent;
  @ViewChild('gitHub') gitHub: GithubComponent;
  @ViewChild('azure') azure: AzureComponent;
  public readonly _baseUrl: string;
  isYamlUpdated = false;
  branch = true;
  tag = true;
  repositories: { key: string; lable: string }[] = [];
  repository = Repository;
  projects: { key: string; lable: string }[] = [];
  versions: string[] = ['13.0.0', '14.0.0', '15.0.0', '16.0.0', '17.0.0'];
  theme: 'vs' | 'vs-dark' = 'vs';
  hide = true;
  code = '';
  manualEntered = false;
  isBrowser = false;
  items: string[] = [];
  projectId = '';
  projectList: ProjectList[];
  selectedProject: ProjectList;
  //---------------------------------------Create Project Form
  stages: string[] = [];
  azureForm: FormGroup = this.fb.group({
    trigger: [''],
    azure_stages: this.fb.array([]),
  });

  bitbucketForm: FormGroup = this.fb.group({
    branches: this.fb.array([]),
    tags: this.fb.array([]),
  });

  githubForm: FormGroup = this.fb.group({
    githubName: [''],
    branchDef: [''],
    push: [''],
    pull: [''],
    pullRequest: [''],
    githubJobs: this.fb.array([]),
  });

  gitlabForm: FormGroup = this.fb.group({
    stages: [''],
    rule_name: [''],
    rules: [''],
    ruless: this.fb.array([]),
    jobs: this.fb.array([]),
  });

  combinedForm = this.fb.group({
    repoName: [''],
    projectType: [''],
    nodeVersion: [''],
    manualEntered: [false],
    bitbucketForm: this.bitbucketForm,
    gitlabForm: this.gitlabForm,
    githubForm: this.githubForm,
    azureForm: this.azureForm,
  });

  //---------------------------------------ngx-monaco-ediotor configuration
  editorOptions_light = {
    theme: 'vs',
    language: 'yaml',
    fontSize: 19,
    selectOnLineNumbers: true,
    renderLineHighlight: 'none',
    scrollBeyondLastLine: false,
    wordWrap: 'on',
    scrollbar: {
      alwaysConsumeMouseWheel: false,
    },
    automaticLayout: true,
  };
  editorOptions_dark = {
    theme: 'vs-dark',
    language: 'yaml',
    fontSize: 19,
    selectOnLineNumbers: true,
    renderLineHighlight: 'none',
    scrollBeyondLastLine: false,
    wordWrap: 'on',
    scrollbar: {
      alwaysConsumeMouseWheel: false,
    },
    automaticLayout: true,
  };

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: object,
    private route: ActivatedRoute,
    private projectListService: ProjectListService,
    private createProjectService: CreateProjectService,
    private YamlService: YamlService
  ) {
    this._baseUrl = environment.apiUrl;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.route.params.subscribe((data: any) => {
      if (data.projectId) {
        this.projectDetails(parseInt(data.projectId));
      }
    });
  }

  toggle() {
    this.hide = !this.hide;
    this.manualEntered = !this.manualEntered;
  }

  ngOnInit() {
    this.repositories = Object.entries(Repository).map(([key, lable]) => ({
      key,
      lable,
    }));
    this.projects = Object.entries(Project).map(([key, lable]) => ({
      key,
      lable,
    }));
    this.YamlService.data$.subscribe((res) => {
      this.code = res;
    });
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  get repoName(): string {
    return this.combinedForm.get('repoName').value;
  }
  get projectType(): string {
    return this.combinedForm.get('projectType').value;
  }
  get version(): string {
    return this.combinedForm.get('nodeVersion').value;
  }

  async onSubmit() {
    const selectedFormType = this.combinedForm.get('repoName')
      ?.value as Repository;
    let selectedActions: object[] = [];

    switch (selectedFormType) {
      case Repository.bitbucket:
        { const bitBucketFormValue = this.bitBucket.checkValue();
        selectedActions = bitBucketFormValue;
        break; }
      case Repository.gitlab:
        { const gitLabFormValue = this.gitLab.checkValue();
        selectedActions.push(gitLabFormValue);
        break; }
      case Repository.github:
        { const gitHubFormValue = this.gitHub.checkValue();
        selectedActions.push(gitHubFormValue);
        break; }
      case Repository.azure:
        { const azureFormValue = this.azure.checkValue();
        selectedActions.push(azureFormValue);
        break; }
    }
    const formDataToSubmit: ProjectDetails = {
      repoName: this.repoName,
      projectType: this.projectType,
      nodeVersion: this.version,
      manualEntered: this.manualEntered,
      selectedActions,
    };
    this.isYamlUpdated
      ? this.createProjectService.updateYamlFormData(
          this.projectId,
          formDataToSubmit
        )
      : this.createProjectService.createProject(formDataToSubmit);
    console.log(
      'Payload for creating YAML----------------------------',
      formDataToSubmit
    );
  }

  projectDetails(projectId: number) {
    this.projectId = projectId.toString();
    this.YamlService.getYamlFile(this.projectId);    
    this.projectListService.getProjectDetail(projectId).subscribe({
      next: (res) => {
        this.selectedProject = res as unknown as ProjectList;
        this.isYamlUpdated = true;
        this.setFormData();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  setFormData() {
    this.hide = this.selectedProject.manualEntered;
    this.combinedForm.patchValue({
      manualEntered: !this.selectedProject.manualEntered,
      projectType: this.selectedProject.projectType,
      repoName: this.selectedProject.repoName,
      nodeVersion: this.selectedProject.nodeVersion,
    });
  }

  updateYAML() {
    const formData = new FormData();
    formData.append(
      'file',
      new Blob([this.code], { type: 'text/yaml' }),
      'ymlFile.yml'
    );
    this.createProjectService.updateYamlEditorData(formData, this.projectId)
  }
}
