import {Resource} from './resource.model';

export class ResourceCodeSnippet extends Resource {
  public snippetTitle: string;
  public snippetDescription: string;
  public snippetDocumentData: string;
  public snippetLanguage: string;

  constructor(options: {} = {}) {
    super(options);
    this.snippetTitle = (options as any).snippetTitle || '';
    this.snippetDescription = (options as any).snippetDescription || '';
    this.snippetDocumentData = (options as any).snippetDocumentData || '';
    this.snippetLanguage = (options as any).snippetLanguage || '';
  }


}
