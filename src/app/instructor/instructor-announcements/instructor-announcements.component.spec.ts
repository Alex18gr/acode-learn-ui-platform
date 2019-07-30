import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorAnnouncementsComponent } from './instructor-announcements.component';

describe('InstructorAnnouncementsComponent', () => {
  let component: InstructorAnnouncementsComponent;
  let fixture: ComponentFixture<InstructorAnnouncementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorAnnouncementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
