export class Course {
  public id: number;
  public name: string;
  public description: string;
  public professor: string;
  public semester: number;
  public instructors: any[];

  constructor(
    id: number,
    name: string,
    desc: string,
    professor: string,
    semester: number,
    instructors: any[]
  ) {
    this.id = id;
    this.name = name;
    this.description = desc;
    this.professor = professor;
    this.semester = semester;
    this.instructors = instructors;
  }
}
