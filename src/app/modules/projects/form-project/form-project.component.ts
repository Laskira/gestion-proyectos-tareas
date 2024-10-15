import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from 'src/app/services/projects.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-project',
  templateUrl: './form-project.component.html',
})
export class FormProjectComponent {
  projectForm: FormGroup;
  isEditMode = false;
  projectId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectsService,
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.projectId = params['id'];
        this.loadProjectData(this.projectId);
      } else {
        this.isEditMode = false;
      }
    });
  }

  loadProjectData(id: any) {
    this.projectService.getProjectById(parseInt(id)).subscribe({
      next: (data: any) => {
        this.projectForm.patchValue({
          title: data[0].company.name,
          descripcion: data[0].company.catchPhrase,
        });
        this.cd.detectChanges();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onSubmit() {
    if (this.projectForm.invalid) {
      return;
    }

    if (this.isEditMode && this.projectId) {
      this.updateProject();
    } else {
      this.createProject();
    }
  }

  createProject() {
    const newProject = this.projectForm.value;

    this.projectService.createProject(newProject).subscribe({
      next: () => {
        console.log(newProject);
        Swal.fire({
          title: 'Projecto guardado exitosamente',
          icon: 'success',
        });
      },
      error: (error) => {
        Swal.fire({
          title: 'Oops! Ha ocurrido un error. Comunicate con soporte',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      },
    });
  }

  updateProject() {
    const updatedProject = this.projectForm.value;

    this.projectService.editProject(updatedProject).subscribe({
      next: () => {
        console.log(updatedProject);
        Swal.fire({
          title: 'Projecto editado exitosamente',
          icon: 'success',
        });
      },
      error: (error) => {
        Swal.fire({
          title: 'Oops! Ha ocurrido un error. Comunicate con soporte',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      },
    });
  }
}
