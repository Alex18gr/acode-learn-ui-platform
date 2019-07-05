export class Course {
  public id: number;
  public name: string;
  public description: string;
  public semester: number;

  constructor(id: number, name: string, desc: string, semester: string) {
    this.id = id;
    this.name = name;
    this.description = desc;
    this.semester = semester;
  }
}
