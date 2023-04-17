import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicGuideEditResourcesModalComponent } from './dynamic-guide-edit-resources-modal.component';

describe('DynamicGuideEditResourcesModalComponent', () => {
  let component: DynamicGuideEditResourcesModalComponent;
  let fixture: ComponentFixture<DynamicGuideEditResourcesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicGuideEditResourcesModalComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicGuideEditResourcesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
