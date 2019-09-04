import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSectionResourcesTableComponent } from './course-section-resources-table.component';

describe('CourseSectionResourcesTableComponent', () => {
  let component: CourseSectionResourcesTableComponent;
  let fixture: ComponentFixture<CourseSectionResourcesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseSectionResourcesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSectionResourcesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
