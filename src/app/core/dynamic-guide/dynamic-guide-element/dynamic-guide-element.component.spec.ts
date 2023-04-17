import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicGuideElementComponent } from './dynamic-guide-element.component';

describe('DynamicGuideElementComponent', () => {
  let component: DynamicGuideElementComponent;
  let fixture: ComponentFixture<DynamicGuideElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicGuideElementComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicGuideElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
