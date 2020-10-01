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
  editMode = [];

  constructor(private studentsService: StudentsService) {}

  ngOnInit() {
    this.editMode.fill(false, 0, this.studentsService.getStudents().length - 1);
  }

  editRow(student, index) {
    this.editMode[index] = true;
  }

  saveRow(student, index) {
    if (
      student.name === '' ||
      student.city === '' ||
      student.college === '' ||
      student.qualification === ''
    ) {
      this.editMode[index] = true;
    } else {
      this.editMode[index] = false;
      this.studentsService.updateStudent(
        student.roll,
        student.name,
        student.city,
        student.college,
        student.qualification
      );
      this.parentFun.emit();
      console.log(this.studentsService.getStudents());
    }
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

  // update() {
  //   this.studentsService.updateStudent(
  //     this.sRoll,
  //     this.sName.value,
  //     this.sCity.value,
  //     this.sCollege.value,
  //     this.sQualification.value
  //   );
  //   this.form.reset();
  //   this.parentFun.emit();
  //   console.log(this.studentsService.getStudents());
  // }

  // submit(form) {
  //   console.log('Successfully Submitted: ', form);
  //   this.update();
  // }
}
