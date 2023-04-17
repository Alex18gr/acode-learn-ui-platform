export class Resource {
  public resourceId: number;
  public name: string;
  public dateCreated: Date;
  public resourceType: string;
  public courseName: string;

  constructor(
    options: {
      resourceId?: number;
      name?: string;
      dateCreated?: Date;
      resourceType?: string;
      courseName?: string;
    } = {}
  ) {
    this.resourceId = options.resourceId;
    this.name = options.name || '';
    this.dateCreated = options.dateCreated || undefined;
    this.resourceType = options.resourceType || '';
    this.courseName = options.courseName || '';
  }
}
