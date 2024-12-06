export interface GitLab{
  stages: string[],
  ruless: rules[]  
  jobs: jobs[]  
}

export interface rules{
  rule: string,
  ruleDefination: ruleDef[]
}

export interface ruleDef{
  keyword: string,
  value: string
}

export interface jobs{
  job_name: string,
  stage: string,
  script: string[],
  rules: string
}

