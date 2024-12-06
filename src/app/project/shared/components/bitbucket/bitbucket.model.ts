export interface BitBucket{
  branch: branchesOrTags[],
  tag: branchesOrTags[]
}
export interface branchesOrTags{
  name: string,
  steps: steps[]
}

export interface steps{
  name: string,
  action: string[]
}
