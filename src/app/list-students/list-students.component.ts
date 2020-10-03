import { StudentsService } from './../services/students.service';
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
  studentArray = [];
  femaleImgUrl =
    'https://www.iconfinder.com/data/icons/business-avatar-1/512/9_avatar-512.png';
  maleImgUrl =
    'https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-3-avatar-2754579_120516.png';
  gender;
  isCompleted: boolean;

  constructor(private studentsService: StudentsService) {}

  ngOnInit() {
    this.studentsService.getJSON().subscribe((data) => {
      this.studentArray = data;
      this.studentArray.map((item) => this.editMode.push(false));
      // console.log(this.editMode);
    });
  }

  editRow(student, index) {
    this.editMode[index] = true;
    this.gender = student.gender;
    this.isCompleted = student.isCompleted;
  }

  saveRow(student, index) {
    if (
      student.name === '' ||
      student.city === '' ||
      student.college === '' ||
      student.qualification === '' ||
      this.gender === ''
    ) {
      this.editMode[index] = true;
    } else {
      this.editMode[index] = false;
      this.studentsService.updateStudent(
        student.roll,
        student.name,
        student.city,
        student.college,
        student.qualification,
        this.gender,
        this.isCompleted
      );
      this.parentFun.emit();
      // console.log(this.studentsService.getStudents());
    }
  }

  delete(e) {
    this.studentsService.deleteStudent(e);
    this.parentFun.emit();
    // console.log(this.studentsService.getStudents());
  }

  deleteSelected() {
    this.studentArray = this.students;
    this.studentArray = this.studentArray.filter(
      (item) => item.isCompleted === false
    );
    this.studentsService.setStudents(this.studentArray);
    this.parentFun.emit();
    // console.log(this.studentsService.getStudents());
  }

  deleteAll() {
    this.studentArray = this.students;
    this.studentArray.map((item) => (item.isCompleted = true));
    this.studentArray = this.studentArray.filter(
      (item) => item.isCompleted === false
    );
    this.studentsService.setStudents(this.studentArray);
    this.parentFun.emit();
    // console.log(this.studentsService.getStudents());
  }

  setGender(e) {
    if (e.target.value === 'female') {
      this.gender = 'female';
    } else {
      this.gender = 'male';
    }
  }
}
