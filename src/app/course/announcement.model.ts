export class Announcement {
  public id: number;
  public courseId: number;
  public title: string;
  public contents: string;
  public professor: string;
  public timestamp: Date;

  constructor(
    id: number,
    courseId: number,
    title: string,
    contents: string,
    professor: string,
    timestamp: Date
  ) {
    this.id = id;
    this.courseId = courseId;
    this.title = title;
    this.contents = contents;
    this.professor = professor;
    this.timestamp = timestamp;
  }

  // {courseId: 1003, title: 'New Book', contents: 'Check the new book at the university bookstore at the 1st floor',
  //   professor: 'alex' , timestamp: 1561939200 }
}
