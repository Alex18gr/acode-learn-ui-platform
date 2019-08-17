import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryViewerComponent } from './repository-viewer.component';

describe('RepositoryViewerComponent', () => {
  let component: RepositoryViewerComponent;
  let fixture: ComponentFixture<RepositoryViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepositoryViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
