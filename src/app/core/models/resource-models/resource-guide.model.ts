import { Resource } from './resource.model';

export class ResourceGuide extends Resource {
  public guideTitle: string;
  public guideDescription: string;
  public guideData: string;

  constructor(options: {} = {}) {
    super(options);
    this.guideTitle = (options as any).guideTitle || '';
    this.guideDescription = (options as any).guideDescription || '';
    this.guideData = (options as any).guideData || '';
  }
}
