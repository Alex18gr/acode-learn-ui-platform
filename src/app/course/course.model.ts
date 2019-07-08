export class Course {
  public id: number;
  public name: string;
  public description: string;
  public professor: string;
  public semester: number;

  constructor(id: number, name: string, desc: string, professor: string, semester: number) {
    this.id = id;
    this.name = name;
    this.description = desc;
    this.professor = professor;
    this.semester = semester;
  }
}
