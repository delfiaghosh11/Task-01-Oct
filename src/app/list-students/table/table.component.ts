import { StudentsService } from './../../students.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
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
