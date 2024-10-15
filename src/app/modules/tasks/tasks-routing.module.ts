import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskAssociateComponent } from './task-associate/task-associate.component';
import { ListAllTaskComponent } from './list-all-task/list-all-task.component';
import { FormTaskComponent } from './form-task/form-task.component';

const routes: Routes = [
  {
    path: '',
    component: ListAllTaskComponent,
    title: 'Tareas',
  },
  {
    path: 'create',
    component: FormTaskComponent,
    title: 'Crear tarea',
  },
  {
    path: 'edit/:id',
    component: FormTaskComponent,
    title: 'Editar tarea',
  },
  {
    path: ':id',
    component: TaskAssociateComponent,
    title: 'Tareas por projecto',
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
