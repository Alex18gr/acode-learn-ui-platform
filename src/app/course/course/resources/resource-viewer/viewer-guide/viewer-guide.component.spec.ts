import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerGuideComponent } from './viewer-guide.component';

describe('ViewerGuideComponent', () => {
  let component: ViewerGuideComponent;
  let fixture: ComponentFixture<ViewerGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewerGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
