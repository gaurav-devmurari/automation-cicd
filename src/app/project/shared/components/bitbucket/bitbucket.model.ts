export interface BitBucket {
  type: 'branch' | 'tag';
  name: string;
  steps: ISteps[];
}
export interface ISteps {
  name: string;
  actions: string[];
}
