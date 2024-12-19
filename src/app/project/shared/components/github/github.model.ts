export interface GitHub {
  github_name: string;
  on: GitHubTriggers;
  git_jobs: GitJob[];
}

export interface GitHubTriggers {
  pull: GitHubBranchTrigger;
  push: GitHubBranchTrigger;
  pull_request: GitHubBranchTrigger;
}

export interface GitHubBranchTrigger {
  branches: string[];
}

export interface GitJob {
  [jobName: string]: GitJobDetails;
}

export interface GitJobDetails {
  'runs-on': string;
  steps: GitStep[];
}

export type GitStep = {
  name: string;
} & GitStepAction;

export type GitStepAction = { uses: string } | { run: string };
