import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faAdd, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ProjectsService } from 'src/app/services/projects.service';
import { TasksService } from 'src/app/services/tasks.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-task-associate',
  templateUrl: './task-associate.component.html',
})
export class TaskAssociateComponent {
  tasksLoading = false;
  tasks: any[] = [];
  projectId!: number;
  projectTitle!: string;

  faTrash = faTrash;
  faPencil = faPencil;
  faAdd = faAdd;

  constructor(
    private taskService: TasksService,
    private route: ActivatedRoute,
    private projectService: ProjectsService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.getProjectName(this.projectId);
    this.getTask(this.projectId);
  }

  getProjectName(projectId: number) {
    this.projectService.getProjectById(projectId).subscribe({
      next: (data: any) => {
        this.projectTitle = data[0].company.name;
        this.cd.detectChanges();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getTask(projectId: number) {
    this.tasksLoading = true;
    this.taskService.getTasksByProjectId(projectId).subscribe({
      next: (data) => {
        this.tasks = data;
        this.cd.detectChanges();
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.tasksLoading = false;
        this.cd.detectChanges();
      },
    });
  }

  editTask(task: any) {
    console.log(task);
  }

  deleteTask(task: any) {
    console.log(task);

    Swal.fire({
      title: '¿Desea eliminar esta tarea?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#a78bfa',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.deleteTask(task).subscribe({
          next: (respose) => {
            Swal.fire({
              title: 'Se ha eliminado la tarea con éxito',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
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
    });
  }

  addNewTask() {}
}
