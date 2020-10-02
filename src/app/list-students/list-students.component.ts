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

  constructor(private studentsService: StudentsService) {}

  ngOnInit() {
    this.studentsService.getJSON().subscribe((data) => {
      this.studentArray = data;
      this.studentArray.map((item) => this.editMode.push(false));
      // console.log(this.editMode);
    });
  }

  editRow(index) {
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
}
