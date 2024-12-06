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
  selector: 'app-azure',
  templateUrl: './azure.component.html',
  styleUrl: './azure.component.scss',
})
export class AzureComponent implements OnInit {
  @Input() selectedProject: ProjectList;
  @Input() azureForm: FormGroup;

  IconPosition = IconPosition;
  trigger: string[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addAzureStage();
    if (this.selectedProject) {
      this.setYamlDataToForm();
    }
  }

  get azure_stages(): FormArray {
    return this.azureForm.get('azure_stages') as FormArray;
  }

  checkValue() {
    const azureStages = this.azureForm.get('azure_stages') as FormArray;
    azureStages.controls.forEach((stage) => {
      const jobs = (stage.get('jobs') as FormArray).controls;
      jobs.forEach((job: FormGroup) => {
        const poolValue = job.get('pool')?.value;
        if (poolValue !== null && poolValue !== undefined) {
          job.patchValue({
            pool: { vmImage: poolValue },
          });
        }
      });
    });
    return this.azureForm.value;
  }

  addAzureStage() {
    this.azure_stages.push(this.createStage());
  }

  createStage(): FormGroup {
    return this.fb.group({
      stage: [''],
      displayName: [''],
      jobs: this.fb.array([this.azureCreateJob()]),
    });
  }

  azureCreateJob(): FormGroup {
    return this.fb.group({
      job: [''],
      displayName: [''],
      pool: [''],
      steps: this.fb.array([this.azureCreateSteps()]),
    });
  }
  azureCreateSteps(): FormGroup {
    return this.fb.group({
      script: [''],
      displayName: [''],
    });
  }

  addJob(jobControl: AbstractControl) {
    const job = jobControl as FormArray;
    job.push(this.azureCreateJob());
  }
  removeJobs(jobControl: AbstractControl) {
    const job = jobControl as FormArray;
    if (job.length == 1) {
      alert("Last job can't be deleted!");
      return;
    }
    job.removeAt(job.length - 1);
  }

  addSteps(stepControl: AbstractControl) {
    const step = stepControl as FormArray;
    step.push(this.azureCreateSteps());
  }
  removeSteps(stepControl: AbstractControl) {
    const step = stepControl as FormArray;
    if (step.length == 1) {
      alert("Last step can't be deleted!");
      return;
    }
    step.removeAt(step.length - 1);
  }

  removeStage() {
    const stage = this.azureForm.get('azure_stages') as FormArray;
    if (stage.length == 1) {
      alert("Last stage can't be deleted!");
      return;
    }
    stage.removeAt(stage.length - 1);
  }
  setYamlDataToForm() {
    const selectedAction = this.selectedProject.selectedActions[0];
    this.azureForm.patchValue({
      trigger: selectedAction.trigger,
    });
    const azure_stages = this.azureForm.get('azure_stages') as FormArray;

    selectedAction.azure_stages.forEach((stages, index) => {
      azure_stages.at(index).patchValue({
        stage: stages.stage,
        displayName: stages.displayName,
      });
      const azure_jobs = azure_stages.at(index).get('jobs') as FormArray;
      stages.jobs.forEach((job, Index) => {
        azure_jobs.controls.at(Index).patchValue({
          job: job.job,
          displayName: job.displayName,
          pool: job.pool.vmImage,
        });
        const azure_steps = azure_jobs?.at(Index).get('steps') as FormArray;
        job.steps.forEach((step, index) => {
          azure_steps.controls.at(index).patchValue({
            script: step.script,
            displayName: step.displayName,
          });
          if (job.steps.length - 1 != index) {
            azure_steps.push(this.azureCreateSteps());
          }
        });
        if (stages.jobs.length - 1 != Index) {
          azure_jobs.push(this.azureCreateJob());
        }
      });
      if (selectedAction.azure_stages.length - 1 != index) {
        azure_stages.push(this.createStage());
      }
    });
  }
}
