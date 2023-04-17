import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddResourceComponent } from './modal-add-resource.component';

describe('ModalAddResourceComponent', () => {
  let component: ModalAddResourceComponent;
  let fixture: ComponentFixture<ModalAddResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAddResourceComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
