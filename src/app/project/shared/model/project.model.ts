import { BitBucket } from '../components/bitbucket/bitbucket.model';
import { Repository } from './project.enum';

export interface Project {
  id?: string;
  repositoryType: Repository;
  projectType: string;
  version: number;
  branches: BranchOrTag[];
  tags: BranchOrTag[];
}

export interface BranchOrTag {
  name: string;
  steps: Step[];
}

export interface Step {
  stepName: string;
  action: string;
}

export interface ProjectDetails {
  repoName: string;
  projectType: string;
  nodeVersion: string;
  manualEntered: boolean;
  selectedActions: object[];
}

export interface YamlData {
  repoName: string;
  projectType: string;
  version: string;
  manualEntered: boolean;
}

export interface GitLab {
  stages: string[];
  ruless: rules[];
  jobs: jobs[];
}

export interface rules {
  rule: string;
  ruleDefination: ruleDef[];
}

export interface ruleDef {
  keyword: string;
  value: string;
}

export interface jobs {
  job_name: string;
  stage: string;
  script: string[];
  rules: string;
}
export interface GitHub {
  type: string;
  name: string;
  steps: steps[];
}

export interface steps {
  name: string;
  actions: string[];
}

export interface Azure {
  git_jobs: jobArray[];
  github_name: string;
  on: onModel;
}
export interface jobArray {
  'runs-on': string;
  steps: step[];
}
export interface step {
  name: string;
}

export interface onModel {
  push: branchModel;
  pull: branchModel;
  pull_request: branchModel;
}
export interface branchModel {
  branches: string[];
}

export interface ProjectList {
  repoName: string;
  projectType: string;
  nodeVersion: string;
  manualEntered: boolean;
  selectedActions: GitLab[] | GitHub[] | Azure[] | BitBucket[];
  fileUrl: string;
  cookieId: string;
  id: string;
  createdAt: string;
  userId: string;
  version: string;
  current_version: string;
  updatedAt: string;
}

export interface SelectedActions {
  type: string;
  name: string;
  steps?: Steps[];
  stages?: string[];
  jobs?: jobModel[];
  services?: string[];
  rules?: ruleModel;
  rule_name?: string[];
  trigger?: string[];
  azure_stages?: azureModel[];
  github_name?: string;
  on?: branchActionModel;
  git_jobs?: githubJobModel;
}

export interface Steps {
  name: string;
  actions: string[];
}

export interface jobModel extends ScriptModel {
  job_name: string;
  stage: string;
  rules: string[];
}

export interface ScriptModel {
  script: string[];
}

export interface Paths {
  paths: string[];
}

export type ruleModel = Record<string, ruleItemModel[]>;

export interface ruleItemModel {
  keyword: string;
  value: string;
}

export interface azureModel {
  stage: string;
  displayName: string;
  jobs: azureJobModel[];
}

export interface azureJobModel {
  job: string;
  displayName: string;
  pool: poolModel;
  steps: azure_steps[];
}

export interface poolModel {
  vmImage: string;
}

export interface azure_steps {
  script: string;
  displayName: string;
}

export type branchActionModel = Record<string, branchesModel>;

export interface branchesModel {
  branches: string[];
}

export type githubJobModel = Record<string, githubModel>;

export interface githubModel {
  runs: string;
  steps: stepsArray[];
}

export interface stepsArray {
  name?: string;
  uses?: string;
  run?: string;
}
