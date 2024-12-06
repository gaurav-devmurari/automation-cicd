import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IconPosition } from '@design-system/button/models/button.enum';
import { ProjectList } from '../../model/project.model';

@Component({
  selector: 'app-gitlab',
  templateUrl: './gitlab.component.html',
  styleUrl: './gitlab.component.scss',
})
export class GitlabComponent implements OnInit {
  @Input() selectedProject: ProjectList;
  @Input() gitlabForm: FormGroup;
  stages: string[] = [];
  scripts: string[] = [];
  IconPosition = IconPosition;
  rule: { rule: string }[] = [];
  jobRules: string[] = [];
  rule_name: string[] = [];
  sample: Record<string, { keyword: string; value: string }[]>;
  projectRepo: string[] = [
    'if',
    'changes',
    'exists',
    'allow_failure',
    'variables',
    'when',
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addRule();
    this.addJob();
    if (this.selectedProject) {
      this.setYamlDataToForm();
    }
  }

  get ruless(): FormArray {
    return this.gitlabForm.get('ruless') as FormArray;
  }

  get job(): FormArray {
    return this.gitlabForm.get('jobs') as FormArray;
  }

  get jobs(): FormArray {
    return this.gitlabForm.get('jobs') as FormArray;
  }
  updateStages(event: string[]){
    this.stages = event
  }
  
  checkValue() {
    const a = this.gitlabForm.get('ruless').value;
    const b = a.reduce(
      (acc, curr) => {
        acc[curr.rule] = curr.ruleDefination;
        return acc;
      },
      {} as Record<string, { keyword: string; value: string }[]>
    );
    this.gitlabForm.patchValue({
      rules: b,
    });
    const c = {
      stages: this.gitlabForm.get('stages').value,
      rule_name: this.gitlabForm.get('rule_name').value,
      rules: this.gitlabForm.get('rules').value,
      jobs: this.gitlabForm.get('jobs').value,
    };
    return c;
  }

  getRuleDefination(rule: AbstractControl): FormArray {
    return rule.get('ruleDefination') as FormArray;
  }

  getRuleName() {
    this.rule = this.gitlabForm.get('ruless').value;
    this.rule_name = this.rule.map((item) => item.rule);
    this.gitlabForm.patchValue({
      rule_name: this.rule_name,
    });
    this.jobRules = this.rule_name;
  }

  getIndex(index: number) {
    const ruleControl = this.jobs.at(index) as FormGroup;
    const rulesValue = ruleControl.get('rules')?.value.toString();
    const rules = rulesValue.split(',');
    ruleControl.patchValue({
      rules: rules,
    });
  }

  addRule() {
    this.ruless.push(this.createRule());
  }

  createRule(): FormGroup {
    return this.fb.group({
      rule: [''],
      ruleDefination: this.fb.array([this.defineRules()]),
    });
  }

  addDef(ruleDefination: AbstractControl) {
    const rule = ruleDefination as FormArray;
    rule.push(this.defineRules());
  }

  defineRules(): FormGroup {
    return this.fb.group({
      keyword: ['', Validators.required],
      value: ['', Validators.required],
    });
  }

  addJob() {
    this.job.push(this.createJob());
  }

  createJob(): FormGroup {
    return this.fb.group({
      job_name: [''],
      stage: [''],
      script: [''],
      rules: [''],
    });
  }

  removeJob(jobControl: AbstractControl) {
    const job = jobControl as FormArray;
    if (job.length == 1) {
      alert("Last job can't be deleted!");
      return;
    }
    job.removeAt(job.length - 1);
  }

  removeRuleDef(ruleDefControl: AbstractControl, ruleIndex: number) {
    const rules = ruleDefControl.get('ruleDefination') as FormArray;
    if (rules.length == 1) {
      alert("Last Rule Defination can't be deleted!");
      return;
    }
    rules.removeAt(ruleIndex);
  }

  removeDef(defControl: AbstractControl) {
    const def = defControl.get('ruleDefination') as FormArray;
    if (def.length == 1) {
      alert("Last Rule defination can't be deleted!");
      return;
    }
    if (def.length > 1) {
      while (def.length > 1) {
        def.removeAt(1);
      }
    }
  }

  removeRule() {
    if (this.ruless.length == 1) {
      alert("Last Rule Can't be deleted!");
      return;
    }
    this.ruless.removeAt(this.ruless.length - 1);
  }

  setYamlDataToForm() {
    const selectedAction = this.selectedProject.selectedActions[0];
    this.jobRules = selectedAction.rule_name;
    console.log(selectedAction);
    this.gitlabForm.patchValue({
      stages: selectedAction.stages,
    });
    const rulesArray = this.ruless;
    const jobsArray = this.jobs;
    selectedAction.rule_name.forEach((ruleName, index) => {
      rulesArray.at(index).patchValue({
        rule: ruleName,
      });
      if (selectedAction.rule_name.length - 1 != index) {
        rulesArray.push(this.createRule());
      }
    });
    const ruleArray = Object.keys(selectedAction.rules).map((key) => [
      key,
      selectedAction.rules[key],
    ]);
    ruleArray.forEach((rules, index) => {
      const a = rulesArray.controls
        .at(index)
        .get('ruleDefination') as FormArray;
      rules.at(1).forEach((ruleValue, Index) => {
        a.controls.at(Index).patchValue({
          keyword: ruleValue.keyword,
          value: ruleValue.value,
        });
        if (rules.at(1).length - 1 != Index) {
          a.push(this.defineRules());
        }
      });
    });
    selectedAction.jobs.forEach((element, index) => {
      this.stages.push(element.stage);
      jobsArray.controls.at(index).patchValue({
        job_name: element.job_name,
        stage: element.stage,
        script: element.script,
        rules: element.rules,
      });
      if (selectedAction.jobs.length - 1 != index) {
        jobsArray.push(this.createJob());
      }
    });
  }
}
