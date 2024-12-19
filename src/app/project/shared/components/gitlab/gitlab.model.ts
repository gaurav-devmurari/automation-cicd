export interface GitLab {
  stages: string[];
  rules: Rules;
  rule_name: string[];
  jobs: Job[];
}

export interface Rules {
  [key: string]: Rule[];
}

export interface Rule {
  keyword: string;
  value: string;
}

export interface Job {
  job_name: string;
  stage: string;
  rules: string[];
  script: string[];
}
