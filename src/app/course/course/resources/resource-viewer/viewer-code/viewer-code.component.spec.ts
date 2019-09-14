import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerCodeComponent } from './viewer-code.component';

describe('ViewerCodeComponent', () => {
  let component: ViewerCodeComponent;
  let fixture: ComponentFixture<ViewerCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewerCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
