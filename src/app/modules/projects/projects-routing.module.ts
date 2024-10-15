import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './list/projects.component';
import { FormProjectComponent } from './form-project/form-project.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
    title: 'Proyecto',
  },
  {
    path: 'create',
    component: FormProjectComponent,
    title: 'Crear proyecto',
  },
  {
    path: 'edit/:id',
    component: FormProjectComponent,
    title: 'Editar proyecto',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
