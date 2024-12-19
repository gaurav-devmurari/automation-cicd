export interface Azure {
  trigger: string[];
  azure_stages: AzureStage[];
}

export interface AzureStage {
  stage: string;
  displayName: string;
  jobs: AzureJob[];
}

export interface AzureJob {
  job: string;
  displayName: string;
  pool: AzurePool;
  steps: AzureStep[];
}

export interface AzurePool {
  vmImage: string;
}

export interface AzureStep {
  displayName: string;
  script: string;
}
