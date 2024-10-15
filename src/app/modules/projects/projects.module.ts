import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProjectsComponent } from './list/projects.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { FormProjectComponent } from './form-project/form-project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProjectsComponent, FormProjectComponent],
  imports: [CommonModule, ProjectsRoutingModule, FontAwesomeModule, FormsModule, ReactiveFormsModule],
})
export class ProjectsModule {}
