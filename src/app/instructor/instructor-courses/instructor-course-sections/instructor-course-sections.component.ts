import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {InstructorCoursesService} from '../../courses/instructor-courses.service';

@Component({
  selector: 'app-instructor-course-sections',
  templateUrl: './instructor-course-sections.component.html',
  styleUrls: ['./instructor-course-sections.component.css']
})
export class InstructorCourseSectionsComponent implements OnInit {
  @ViewChild('listElement', {static: false}) listElementRef: ElementRef;
  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi'
  ];
  editMode = false;
  editListMode = false;

  constructor(private renderer: Renderer2,
              private coursesService: InstructorCoursesService) { }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

  onListItemClick(event: MouseEvent) {
    if (!this.editListMode) {
      if ((event.target as any).classList.contains('selected-list-item')) {
        this.renderer.removeClass(event.target, 'selected-list-item');
        this.removeSelection();
      } else {
        this.removeSelection();
        this.renderer.addClass(event.target, 'selected-list-item');
      }
    }
  }

  private removeSelection() {
    for (const child of this.listElementRef.nativeElement.children) {
      this.renderer.removeClass(child, 'selected-list-item');
    }
  }

  triggerListEditMode() {
    if (!this.editListMode) {
      this.removeSelection();
      this.editListMode = true;
    } else {
      this.editListMode = false;
    }
  }
}
