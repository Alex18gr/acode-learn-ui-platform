import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAnnouncementListComponent } from './home-announcement-list.component';

describe('HomeAnnouncementListComponent', () => {
  let component: HomeAnnouncementListComponent;
  let fixture: ComponentFixture<HomeAnnouncementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeAnnouncementListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAnnouncementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
