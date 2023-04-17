import { Course } from '../../course/course.model';
import { CourseResources } from '../../instructor/resource/instructor-resource.service';

export class CourseSection {
  public courseSectionId: number;
  public name: string;
  public description: string;
  public order: number;
  public dateCreated: Date;
  public course: Course;
  public resources: CourseResources;

  constructor(
    courseSectionId?: number,
    name?: string,
    description?: string,
    order?: number,
    dateCreated?: Date,
    course?: Course,
    resources?: CourseResources
  ) {
    this.courseSectionId = courseSectionId;
    this.name = name;
    this.description = description;
    this.order = order;
    this.dateCreated = dateCreated;
    this.course = course;
    this.resources = resources;
  }
}
