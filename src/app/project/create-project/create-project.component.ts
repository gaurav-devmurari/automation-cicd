/* eslint-disable @typescript-eslint/no-unused-expressions */
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project, Repository } from '../shared/model/project.enum';
import {
  ChangeDetectorRef,
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
import {
  AzureArray,
  BitBucketArray,
  GitHubArray,
  GitLabArray,
} from '../shared/model/demoPipelines';
import { BitBucket } from '../shared/components/bitbucket/bitbucket.model';
import { GitHub, GitStep } from '../shared/components/github/github.model';

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
    repoName: ['', Validators.required],
    projectType: ['', Validators.required],
    nodeVersion: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(0[1-9]|1[0-9]|2[0-5])\.(0[0-9]|[1-9][0-9])\.(0[0-9]|[1-9][0-9])$/
        ),
      ],
    ],
    bitbucketForm: this.bitbucketForm,
    gitlabForm: this.gitlabForm,
    githubForm: this.githubForm,
    azureForm: this.azureForm,
  });
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
    readOnly: true,
  };

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: object,
    private route: ActivatedRoute,
    private projectListService: ProjectListService,
    private createProjectService: CreateProjectService,
    private YamlService: YamlService,
    private cdr: ChangeDetectorRef
  ) {
    this._baseUrl = environment.apiUrl;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.route.params.subscribe((data: any) => {
      if (data.projectId) {
        this.projectDetails(parseInt(data.projectId));
      }
    });

    this.combinedForm.get('repoName').valueChanges.subscribe((data: string) => {
      if (data) {
        this.loadDefaultForm();
      }
    });

    this.combinedForm
      .get('projectType')
      .valueChanges.subscribe((data: string) => {
        if (data) {
          this.loadDefaultForm();
        }
      });
  }

  toggle() {
    this.hide = !this.hide;
    this.manualEntered = !this.manualEntered;
  }
  private token: string;
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
    if (isPlatformBrowser(this.platformId)) {
      this.token = localStorage.getItem('token');
    }
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
      case Repository.bitbucket: {
        const bitBucketFormValue = this.bitBucket.checkValue();
        selectedActions = bitBucketFormValue;
        break;
      }
      case Repository.gitlab: {
        const gitLabFormValue = this.gitLab.checkValue();
        selectedActions.push(gitLabFormValue);
        break;
      }
      case Repository.github: {
        const gitHubFormValue = this.gitHub.checkValue();
        selectedActions.push(gitHubFormValue);
        break;
      }
      case Repository.azure: {
        const azureFormValue = this.azure.checkValue();
        selectedActions.push(azureFormValue);
        break;
      }
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
      : this.token
        ? this.createProjectService.createProject(formDataToSubmit)
        : this.createProjectService.createProjectWithoutToken(formDataToSubmit);
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
    // this.hide = this.selectedProject.manualEntered;
    this.combinedForm.patchValue({
      projectType: this.selectedProject.projectType,
      repoName: this.selectedProject.repoName,
      nodeVersion: this.selectedProject.nodeVersion,
    });
  }

  // ---------------------------------    BitBucket   --------------------------------
  setBitBucketForm(data: BitBucket[]): void {
    const branchesArray = this.bitbucketForm.get('branches') as FormArray;
    const tagsArray = this.bitbucketForm.get('tags') as FormArray;
    this.removeEmptyEntries(branchesArray);
    this.removeEmptyEntries(tagsArray);

    data.forEach((entry) => {
      if (entry.type === 'branch') {
        branchesArray.push(this.createBitBucketEntry(entry));
      } else if (entry.type === 'tag') {
        tagsArray.push(this.createBitBucketEntry(entry));
      }
    });
  }

  private createBitBucketEntry(entry: BitBucket): FormGroup {
    return this.fb.group({
      name: [entry.name],
      steps: this.fb.array(
        entry.steps.map((step) =>
          this.fb.group({
            name: [step.name],
            actions: this.fb.array(
              step.actions.map((action) => this.fb.control(action))
            ),
          })
        )
      ),
    });
  }

  private removeEmptyEntries(array: FormArray): void {
    for (let i = array.length - 1; i >= 0; i--) {
      const group = array.at(i) as FormGroup;
      const name = group.get('name')?.value;
      if (!name || name.trim() === '') {
        array.removeAt(i);
      }
    }
  }

  // ---------------------------------------------------------------------------------
  // ---------------------------------    GitHub   -----------------------------------
  branches: string[] = [];
  setGitHubForm(data: GitHub) {
    const selectedAction = data;
    if (!selectedAction) return;

    // Update visibility flags for actions
    ['push', 'pull', 'pull_request'].forEach((action) => {
      this[action] = !selectedAction.on[action];
    });

    // Extract and de-duplicate branches
    this.branches = Array.from(
      new Set(
        Object.values(selectedAction.on).flatMap((trigger) => trigger.branches)
      )
    );

    // Patch the form's main values
    this.githubForm.patchValue({
      githubName: selectedAction.github_name,
      branchDef: this.branches,
      push: selectedAction.on.push?.branches.join(', ') || '',
      pull: selectedAction.on.pull?.branches.join(', ') || '',
      pullRequest: selectedAction.on.pull_request?.branches.join(', ') || '',
    });

    // Patch GitHub jobs
    const gitHubJobsArray = this.githubForm.get('githubJobs') as FormArray;
    gitHubJobsArray.clear();

    selectedAction.git_jobs.forEach((git_job) => {
      const jobName = Object.keys(git_job)[0];
      const jobDetails = git_job[jobName];

      const jobGroup = this.createGhJob();
      jobGroup.patchValue({
        jobName,
        runsOn: jobDetails['runs-on'],
      });

      const stepsArray = jobGroup.get('steps') as FormArray;
      stepsArray.clear();

      jobDetails.steps.forEach((step: GitStep) => {
        const isUses = 'uses' in step;
        stepsArray.push(
          this.fb.group({
            name: step.name,
            useOrRun: isUses ? 'uses' : 'run',
            stepValue: isUses ? step['uses'] : step['run'],
          })
        );
      });
      gitHubJobsArray.push(jobGroup);
    });
  }
  createGhJob(): FormGroup {
    return this.fb.group({
      jobName: [''],
      runsOn: [''],
      needs: [''],
      steps: this.fb.array([this.createSteps()]),
    });
  }

  createSteps(): FormGroup {
    return this.fb.group({
      name: [''],
      useOrRun: [''],
      stepValue: [''],
    });
  }

  // ---------------------------------------------------------------------------------
  loadDefaultForm() {
    const repoName = this.combinedForm.get('repoName').value as Repository;
    const projectType = this.combinedForm.get('projectType').value as Project;

    if (repoName && projectType) {
      switch (repoName) {
        case Repository.bitbucket:
          const BitBucketData = BitBucketArray[projectType];
          this.setBitBucketForm(BitBucketData);
          break;
        case Repository.gitlab:
          const GitLabData = GitLabArray[projectType];
          // this.setGitLabForm(GitLabData);
          break;
        case Repository.github:
          const GitHubData = GitHubArray[projectType];
          this.setGitHubForm(GitHubData[0]);
          break;
        case Repository.azure:
          const AzureData = AzureArray[projectType];
          // this.setAzureForm(AzureData);
          break;
      }
    } else {
    }
  }

  updateYAML() {
    const formData = new FormData();
    formData.append(
      'file',
      new Blob([this.code], { type: 'text/yaml' }),
      'ymlFile.yml'
    );
    this.createProjectService.updateYamlEditorData(formData, this.projectId);
  }
}
