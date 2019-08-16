import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicGuideComponent } from './dynamic-guide.component';

describe('DynamicGuideComponent', () => {
  let component: DynamicGuideComponent;
  let fixture: ComponentFixture<DynamicGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
