import {Resource} from './resource.model';

export class ResourceRepository extends Resource {
  public repoUrl: string;
  public repoName: string;
  public repoNameRepo: string;

  constructor(options: {} = {}) {
    super(options);
    this.repoName = (options as any).repoName || '';
    this.repoUrl = (options as any).repoUrl || '';
    this.repoNameRepo = (options as any).repoNameRepo || '';
  }


}
