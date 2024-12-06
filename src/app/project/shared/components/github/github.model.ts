export interface GitHub {
  github_name?: string,
  on: branchActionModel,
  git_jobs: githubJobModel,
}

export type branchActionModel = Record<string, branchesModel>;

export interface branchesModel {
  branches: string[],
}
export type githubJobModel = Record<string, githubModel>;

export interface githubModel {
  runs: string,
  steps: stepsArray[],
}

export interface stepsArray {
  name?: string,
  uses?: string,
  run?: string,
}
