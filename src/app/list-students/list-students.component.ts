import { StudentsService } from './../students.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css'],
})
export class ListStudentsComponent implements OnInit {
  studentsData = [];

  constructor(private studentsService: StudentsService) {}

  ngOnInit() {
    this.studentsService.getJSON().subscribe((data) => {
      this.studentsData = data;
    });
  }

  update() {
    this.studentsData = this.studentsService.getStudents();
  }
}
