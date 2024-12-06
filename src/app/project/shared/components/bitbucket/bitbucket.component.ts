import { Component, Input, OnInit } from '@angular/core';
import { IconPosition } from '@design-system/button/models/button.enum';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProjectList } from '../../model/project.model';

@Component({
  selector: 'app-bitbucket',
  templateUrl: './bitbucket.component.html',
  styleUrl: './bitbucket.component.scss',
})
export class BitbucketComponent implements OnInit {
  @Input() bitbucketForm: FormGroup;
  @Input() selectedProject: ProjectList;
  IconPosition = IconPosition;
  branch = true;
  tag = true;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addBranch();
    this.addTag();
    if (this.selectedProject) {
      this.setYamlDataToForm();
    }
  }

  checkValue() {
    const data = this.bitbucketForm.value;
    const branches = data.branches.map((branch) => ({
      type: 'branch',
      name: branch.name,
      steps: branch.steps,
    }));
    const tags = data.tags.map((tags) => ({
      type: 'tag',
      name: tags.name,
      steps: tags.steps,
    }));
    return Array.prototype.concat(branches, tags);
  }

  get branches(): FormArray {
    return this.bitbucketForm.get('branches') as FormArray;
  }

  get tags(): FormArray {
    return this.bitbucketForm.get('tags') as FormArray;
  }

  createBranchOrTag(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      steps: this.fb.array([this.createDefaultStep()]),
    });
  }

  createDefaultStep(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      actions: ['', Validators.required],
    });
  }

  addBranch(): void {
    this.branches.push(this.createBranchOrTag());
  }

  addTag(): void {
    this.tags.push(this.createBranchOrTag());
  }

  createStep(): FormGroup {
    return new FormGroup({
      name: new FormControl(''),
      actions: new FormControl(''),
    });
  }

  addStep(stepsControl: AbstractControl | null): void {
    const steps = stepsControl as FormArray;
    steps.push(this.createStep());
  }

  removeBranch(): void {
    if (this.branches.length == 1) {
      alert("Last branch can't be deleted!");
      return;
    }
    this.branches.removeAt(this.branches.length - 1);
  }

  removeTag(): void {
    if (this.tags.length == 1) {
      alert("Last tag can't be deleted!");
      return;
    }
    this.tags.removeAt(this.branches.length - 1);
  }

  removeStep(branchOrTag: AbstractControl, stepIndex: number): void {
    const steps = branchOrTag.get('steps') as FormArray;
    if (steps.length == 1) {
      alert("Last step can't be deleted!");
      return;
    }
    steps.removeAt(stepIndex);
  }

  removeAllSteps(branchOrTag: AbstractControl): void {
    const steps = branchOrTag.get('steps') as FormArray;
    if (steps.length == 1) {
      alert("Last step can't be deleted!");
      return;
    }
    if (steps.length > 1) {
      while (steps.length > 1) {
        steps.removeAt(1);
      }
    }
  }
  setYamlDataToForm() {
    let branchControl = 0;
    let tagControl = 0;     
    const selectedAction = this.selectedProject
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .selectedActions as unknown as any[];
    selectedAction.forEach((action) => {
      const branchStepsArray = this.branches.controls
        .at(branchControl)
        .get('steps') as FormArray;
      const tagStepsArray = this.tags.controls
        .at(tagControl)
        .get('steps') as FormArray;
      if (action.type === 'branch') {
        this.branch = true;
        this.branches.controls.at(branchControl).patchValue({
          name: action.name,
        });
        action.steps.forEach((element) => {
          branchStepsArray.at(branchStepsArray.length - 1).patchValue({
            name: element.name,
            actions: element.actions,
          });
          branchStepsArray.push(this.createDefaultStep());
        });
        branchControl++;
        this.branches.push(this.createBranchOrTag());
      } else {
        this.tag = true;
        this.tags.controls.at(tagControl).patchValue({
          name: action.name,
        });
        action.steps.forEach((element) => {
          tagStepsArray.at(tagStepsArray.length - 1).patchValue({
            name: element.name,
            actions: element.actions,
          });
          tagStepsArray.push(this.createDefaultStep());
        });
        tagControl++;
        this.tags.push(this.createBranchOrTag());
      }
    });
    if (this.branches.controls.length > branchControl) {
      this.branches.removeAt(branchControl);
    }
    if (this.tags.controls.length > tagControl) {
      this.tags.removeAt(tagControl);
    }
    this.branches.controls.forEach((element) => {
      const steps = element.get('steps') as FormArray;
      steps.controls.forEach((step) => {
        if (step.get('name').value === '') {
          steps.removeAt(steps.length - 1);
        }
      });
    });
    this.tags.controls.forEach((element) => {
      const steps = element.get('steps') as FormArray;
      steps.controls.forEach((step) => {
        if (step.get('name').value === '') {
          steps.removeAt(steps.length - 1);
        }
      });
    });
  }
}
