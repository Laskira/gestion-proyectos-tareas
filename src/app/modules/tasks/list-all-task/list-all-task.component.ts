import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faAdd,
  faPencil,
  faSearch,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { TasksService } from 'src/app/services/tasks.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-all-task',
  templateUrl: './list-all-task.component.html',
})
export class ListAllTaskComponent {
  tasksLoading = false;
  tasks: any[] = [];
  filteredTasks: any[] = [];
  search: string = '';

  faTrash = faTrash;
  faPencil = faPencil;
  faAdd = faAdd;
  faSearch = faSearch;

  constructor(
    private taskService: TasksService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.tasksLoading = true;
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.filteredTasks = data;
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

  filterTasks() {
    this.filteredTasks = this.tasks.filter((task) =>
      task.title.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  addNewTask() {
    this.router.navigate(['create'], { relativeTo: this.activatedRoute });
  }

  editTask(id: string) {
    this.router.navigate([`edit/${id}`], { relativeTo: this.activatedRoute });
  }

  deleteTask(task: any) {
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
          next: () => {
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
}
