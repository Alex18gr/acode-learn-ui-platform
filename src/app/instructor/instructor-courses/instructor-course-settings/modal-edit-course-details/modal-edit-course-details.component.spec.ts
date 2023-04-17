import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditCourseDetailsComponent } from './modal-edit-course-details.component';

describe('ModalEditCourseDetailsComponent', () => {
  let component: ModalEditCourseDetailsComponent;
  let fixture: ComponentFixture<ModalEditCourseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalEditCourseDetailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditCourseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
