export class Resource {
  public id: number;
  public name: string;
  public dateCreated: Date;
  public resourceType: string;
  public courseName: string;


  constructor(options: {
    id?: number,
    name?: string,
    dateCreated?: Date,
    resourceType?: string,
    courseName?: string
  } = {}) {
    this.id = options.id;
    this.name = options.name || '';
    this.dateCreated = options.dateCreated || undefined;
    this.resourceType = options.resourceType || '';
    this.courseName = options.courseName || '';
  }
}
