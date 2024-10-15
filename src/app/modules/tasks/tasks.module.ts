import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskAssociateComponent } from './task-associate/task-associate.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { ListAllTaskComponent } from './list-all-task/list-all-task.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormTaskComponent } from './form-task/form-task.component';

@NgModule({
  declarations: [TaskAssociateComponent, ListAllTaskComponent, FormTaskComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class TasksModule {}
