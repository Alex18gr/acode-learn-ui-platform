import { Resource } from './resource.model';

export class ResourceLink extends Resource {
  public link: string;
  public description: string;

  constructor(options: {} = {}) {
    super(options);
    this.link = (options as any).link || '';
    this.description = (options as any).description || '';
  }
}
