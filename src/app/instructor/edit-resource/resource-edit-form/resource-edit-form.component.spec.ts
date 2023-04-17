import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceEditFormComponent } from './resource-edit-form.component';

describe('ResourceEditFormComponent', () => {
  let component: ResourceEditFormComponent;
  let fixture: ComponentFixture<ResourceEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResourceEditFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
