import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from 'src/app/services/projects.service';
import { TasksService } from 'src/app/services/tasks.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-task',
  templateUrl: './form-task.component.html',
})
export class FormTaskComponent {
  taskForm: FormGroup;
  isEditMode = false;
  taskId: string | null = null;
  projects: any[] = [];

  constructor(
    private fb: FormBuilder,
    private taskService: TasksService,
    private activatedRoute: ActivatedRoute,
    private projectsService: ProjectsService,
    private cd: ChangeDetectorRef
  ) {
    this.taskForm = this.fb.group({
      projectId: ['', Validators.required],
      title: ['', Validators.required],
      completed: [false],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.taskId = params['id'];
        this.loadTaskData(this.taskId);
      } else {
        this.isEditMode = false;
      }
    });

    this.getProjects();
  }

  loadTaskData(id: any) {
    this.taskService.getTaskById(parseInt(id)).subscribe({
      next: (data: any) => {
        this.taskForm.patchValue({
          projectId: data[0].userId,
          title: data[0].title,
          completed: data[0].completed,
        });
        this.cd.detectChanges();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onSubmit() {
    if (this.taskForm.invalid) {
      return;
    }

    if (this.isEditMode && this.taskId) {
      this.updateTask();
    } else {
      this.createTask();
    }
  }

  createTask() {
    const newTask = this.taskForm.value;

    this.taskService.createTask(newTask).subscribe({
      next: () => {
        console.log(newTask);
        Swal.fire({
          title: 'Tarea guardada exitosamente',
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

  updateTask() {
    const updatedTask = this.taskForm.value;

    this.taskService.editTask(updatedTask).subscribe({
      next: () => {
        console.log(updatedTask);
        Swal.fire({
          title: 'Tarea editada exitosamente',
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

  getProjects() {
    this.projectsService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.cd.detectChanges();
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.cd.detectChanges();
      },
    });
  }
}
