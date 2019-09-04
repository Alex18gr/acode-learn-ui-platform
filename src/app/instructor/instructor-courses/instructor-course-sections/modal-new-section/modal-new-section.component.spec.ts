import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewSectionComponent } from './modal-new-section.component';

describe('ModalNewSectionComponent', () => {
  let component: ModalNewSectionComponent;
  let fixture: ComponentFixture<ModalNewSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNewSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNewSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
