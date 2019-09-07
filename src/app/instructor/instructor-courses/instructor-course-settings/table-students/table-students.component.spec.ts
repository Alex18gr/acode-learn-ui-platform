import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableStudentsComponent } from './table-students.component';

describe('TableStudentsComponent', () => {
  let component: TableStudentsComponent;
  let fixture: ComponentFixture<TableStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
