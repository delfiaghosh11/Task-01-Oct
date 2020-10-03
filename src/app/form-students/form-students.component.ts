import { StudentsService } from './../services/students.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-students',
  templateUrl: './form-students.component.html',
  styleUrls: ['./form-students.component.css'],
})
export class FormStudentsComponent implements OnInit {
  @Input() students: any;
  @Output() parentFun: EventEmitter<any> = new EventEmitter();

  studentArray = [];
  lastRoll: number;
  newStudent: Object;

  constructor(private studentsService: StudentsService) {}

  ngOnInit(): void {}

  form = new FormGroup({
    studentName: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30),
      Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"),
    ]),
    studentCity: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"),
    ]),
    studentCollege: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
      Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"),
    ]),
    qualification: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
      Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"),
    ]),
    gender: new FormControl('', Validators.required),
  });

  get studentName() {
    return this.form.get('studentName');
  }

  get studentCity() {
    return this.form.get('studentCity');
  }

  get studentCollege() {
    return this.form.get('studentCollege');
  }

  get qualification() {
    return this.form.get('qualification');
  }

  get gender() {
    return this.form.get('gender');
  }

  // get female() {
  //   return this.form.get('female');
  // }

  // get male() {
  //   return this.form.get('male');
  // }

  createStudent() {
    this.studentArray = this.studentsService.getStudents();

    if (this.studentArray.length > 0) {
      this.lastRoll = this.studentArray[this.studentArray.length - 1].roll;
    } else {
      this.lastRoll = 0;
    }

    this.studentsService.addStudent({
      roll: ++this.lastRoll,
      name: this.studentName.value,
      city: this.studentCity.value,
      college: this.studentCollege.value,
      qualification: this.qualification.value,
      gender: this.gender.value,
      isCompleted: false,
    });
    this.parentFun.emit();
    this.form.reset();
    // console.log(this.studentsService.getStudents());
  }

  setGender(e) {
    if (e.target.value === 'female') {
      this.gender.reset();
      this.gender.setValue('female');
    } else {
      this.gender.reset();
      this.gender.setValue('male');
    }
  }

  submit(form) {
    console.log('Successfully Submitted: ', form);
    this.createStudent();
  }
}
