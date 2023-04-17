import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteResourceComponent } from './modal-delete-resource.component';

describe('ModalDeleteResourceComponent', () => {
  let component: ModalDeleteResourceComponent;
  let fixture: ComponentFixture<ModalDeleteResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDeleteResourceComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
