import { Resource } from './resource.model';

export class ResourceFile extends Resource {
  public fileName: string;
  public fileType: string;
  public summary: string;

  constructor(options: {} = {}) {
    super(options);
    this.fileName = (options as any).fileName || '';
    this.fileType = (options as any).fileType || '';
    this.summary = (options as any).summary || '';
  }
}
