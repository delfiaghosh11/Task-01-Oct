import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStudentsComponent } from './form-students.component';

describe('FormStudentsComponent', () => {
  let component: FormStudentsComponent;
  let fixture: ComponentFixture<FormStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
