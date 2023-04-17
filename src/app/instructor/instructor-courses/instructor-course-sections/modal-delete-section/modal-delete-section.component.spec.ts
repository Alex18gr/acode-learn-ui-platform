import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteSectionComponent } from './modal-delete-section.component';

describe('ModalDeleteSectionComponent', () => {
  let component: ModalDeleteSectionComponent;
  let fixture: ComponentFixture<ModalDeleteSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDeleteSectionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
