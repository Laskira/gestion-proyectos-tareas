import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faAdd,
  faPencil,
  faSearch,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { ProjectsService } from 'src/app/services/projects.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
})
export class ProjectsComponent {
  projectsLoading = false;
  projects: any[] = [];
  filteredProjects: any[] = [];
  search: string = '';

  faTrash = faTrash;
  faPencil = faPencil;
  faAdd = faAdd;
  faSearch = faSearch;

  constructor(
    private projectsService: ProjectsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.projectsLoading = true;
    this.projectsService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.filteredProjects = data;
        this.cd.detectChanges();
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.projectsLoading = false;
        this.cd.detectChanges();
      },
    });
  }

  filterProjects() {
    this.filteredProjects = this.projects.filter((project) =>
      project.company.name.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  addNewProject() {
    this.router.navigate(['create'], { relativeTo: this.activatedRoute });
  }

  editProject(id: string) {
    this.router.navigate([`edit/${id}`], { relativeTo: this.activatedRoute });
  }

  deleteProject(project: any) {
    Swal.fire({
      title: '¿Desea eliminar este projecto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#a78bfa',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.projectsService.deleteProject(project).subscribe({
          next: () => {
            Swal.fire({
              title: 'Se ha eliminado el proyecto con éxito',
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
