import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAnnouncementListItemComponent } from './home-announcement-list-item.component';

describe('HomeAnnouncementListItemComponent', () => {
  let component: HomeAnnouncementListItemComponent;
  let fixture: ComponentFixture<HomeAnnouncementListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeAnnouncementListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAnnouncementListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
