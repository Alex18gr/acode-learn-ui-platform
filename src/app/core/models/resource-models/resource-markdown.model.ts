import { Resource } from './resource.model';

export class ResourceMarkdown extends Resource {
  public documentTitle: string;
  public description: string;
  public markdownDocumentData: string;

  constructor(options: {} = {}) {
    super(options);
    this.documentTitle = (options as any).documentTitle || '';
    this.description = (options as any).description || '';
    this.markdownDocumentData = (options as any).markdownDocumentData || '';
  }
}
