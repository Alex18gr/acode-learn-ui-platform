import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSectionsComponent } from './course-sections.component';

describe('CourseSectionsComponent', () => {
  let component: CourseSectionsComponent;
  let fixture: ComponentFixture<CourseSectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseSectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
