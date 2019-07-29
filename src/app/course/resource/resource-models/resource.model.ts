export class Resource {
  public id: number;
  public name: string;
  public dateCreated: Date;
  public resourceType: string;


  constructor(id: number, name: string, dateCreated: Date, resourceType: string) {
    this.id = id;
    this.name = name;
    this.dateCreated = dateCreated;
    this.resourceType = resourceType;
  }
}
