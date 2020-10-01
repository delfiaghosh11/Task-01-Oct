import { StudentsService } from './../services/students.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css'],
})
export class ListStudentsComponent implements OnInit {
  @Input() students: any;
  @Output() parentFun: EventEmitter<any> = new EventEmitter();

  current: Object;
  sRoll: number;

  constructor(private studentsService: StudentsService) {}

  ngOnInit() {}

  form = new FormGroup({
    sName: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30),
      Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"),
    ]),
    sCity: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"),
    ]),
    sCollege: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
      Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"),
    ]),
    sQualification: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
      Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"),
    ]),
  });

  get sName() {
    return this.form.get('sName');
  }

  get sCity() {
    return this.form.get('sCity');
  }

  get sCollege() {
    return this.form.get('sCollege');
  }

  get sQualification() {
    return this.form.get('sQualification');
  }

  getCurrent(index) {
    this.students = this.studentsService.getStudents();
    this.current = this.students[index];
    this.sRoll = this.current['roll'];
    // console.log(this.current['roll']);
    // console.log(this.current['name']);
  }

  delete(e) {
    this.studentsService.deleteStudent(e);
    console.log(this.studentsService.getStudents());
    this.parentFun.emit();
  }

  update() {
    this.studentsService.updateStudent(
      this.sRoll,
      this.sName.value,
      this.sCity.value,
      this.sCollege.value,
      this.sQualification.value
    );
    this.form.reset();
    this.parentFun.emit();
    console.log(this.studentsService.getStudents());
  }

  submit(form) {
    console.log('Successfully Submitted: ', form);
    this.update();
  }
}
