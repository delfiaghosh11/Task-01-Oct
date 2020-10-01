import { StudentsService } from './students.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListStudentsComponent } from './list-students/list-students.component';
import { FormStudentsComponent } from './form-students/form-students.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './list-students/table/table.component';
import { TableHeadComponent } from './list-students/table-head/table-head.component';
import { TableBodyComponent } from './list-students/table-body/table-body.component';

@NgModule({
  declarations: [
    AppComponent,
    ListStudentsComponent,
    FormStudentsComponent,
    TableComponent,
    TableHeadComponent,
    TableBodyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [StudentsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
