import { IconPosition } from '@design-system/button/models/button.enum';
import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ProjectList } from '../../model/project.model';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrl: './github.component.scss',
})
export class GithubComponent implements OnInit {
  @Input() githubForm: FormGroup;
  @Input() selectedProject: ProjectList;

  IconPosition = IconPosition;
  needs = true;
  branches: string[] = [];
  useOrRun: string[] = ['uses', 'run'];
  pull = true;
  pullRequest = true;
  push = true;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addjob();
    if (this.selectedProject) {
      this.setYamlDataToForm();
    }
  }

  dataEmmiter(event: { array: string; value: string[] }) {
    this.data[event.array].branches = event.value;
  }

  get githubJobs(): FormArray {
    return this.githubForm.get('githubJobs') as FormArray;
  }

  data: {
    push: {
      branches: [];
    };
    pull: {
      branches: [];
    };
    pull_request: {
      branches: [];
    };
  };

  checkValue() {
    const gitHubJob = this.githubForm.get('githubJobs').value;
    const gitJobs = gitHubJob.map((job) => {
      return {
        [job.jobName]: {
          'runs-on': job.runsOn,
          steps: job.steps.map((step) => ({
            name: step.name,
            [step.useOrRun]: step.stepValue,
          })),
        },
      };
    });
    const filteredData = Object.entries(this.data)
      .filter(([, value]) => value.branches.length > 0)
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
    const gitHubFormData = {
      github_name: this.githubForm.get('githubName').value,
      on: filteredData,
      git_jobs: gitJobs,
    };

    return gitHubFormData;
  }

  addjob() {
    this.githubJobs.push(this.createGhJob());
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

  removeJob() {
    if (this.githubJobs.length == 1) {
      alert("Last job can't be deleted!");
      return;
    }
    this.githubJobs.removeAt(this.githubJobs.length - 1);
  }

  removeSteps(stepControl: AbstractControl) {
    const steps = stepControl as FormArray;
    if (steps.length == 1) {
      alert("Last Step can't be deleted!");
      return;
    }
    if (steps.length > 1) {
      while (steps.length > 1) {
        steps.removeAt(1);
      }
    }
  }

  removeStepAtPosition(stepControl: AbstractControl, stepIndex: number) {
    const step = stepControl as FormArray;
    if (step.length == 1) {
      alert("Last step can't be deleted!");
      return;
    }
    step.removeAt(stepIndex);
  }

  addSteps(stepControl: AbstractControl) {
    const step = stepControl as FormArray;
    step.push(this.createSteps());
  }

  setYamlDataToForm() {
    const selectedAction = this.selectedProject.selectedActions[0];
    this.data = selectedAction?.on as {
      push: {
        branches: [];
      };
      pull: {
        branches: [];
      };
      pull_request: {
        branches: [];
      };
    };
    const actions = Object.keys(selectedAction?.on);
    actions.forEach((action) => {
      if (action == 'push') {
        this.push = false;
      }
      if (action == 'pull') {
        this.pull = false;
      }
      if (action == 'pull_request') {
        this.pullRequest = false;
      }
    });
    const action = Object.values(this.data);
    let branch: string[];
    action.forEach((element) => {
      branch = [...element.branches];
    });
    this.branches = branch;
    this.githubForm.patchValue({
      githubName: selectedAction.github_name,
      branchDef: this.branches,
      push: this.data['push'],
      pull: this.data['pull'],
      pullRequest: this.data['pullRequest'],
    });
    const gitHubJobsArray = this.githubForm.get('githubJobs') as FormArray;
    selectedAction.git_jobs.forEach((git_job, index) => {
      gitHubJobsArray.at(index)?.patchValue({
        jobName: Object.keys(git_job),
        runsOn: Object.values(git_job)?.at(0)['runs-on'],
      });
      const gitHubSteps = gitHubJobsArray.at(index).get('steps') as FormArray;
      Object.values(git_job)
        ?.at(0)['steps'].forEach((step, Index) => {
          const key = step.uses ? 'uses' : 'run';
          gitHubSteps.at(Index)?.patchValue({
            name: step.name,
            useOrRun: key,
            stepValue: step[key],
          });
          if (Object.values(git_job)?.at(0)['steps'].length - 1 != Index) {
            gitHubSteps.push(this.createSteps());
          }
        });
      if (selectedAction.git_jobs.length - 1 != index) {
        gitHubJobsArray.push(this.createGhJob());
      }
    });
  }
}
