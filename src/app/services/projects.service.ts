import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private http: HttpClient) {}
  private apiUrl = `https://jsonplaceholder.typicode.com/users`;

  getProjects() {
    let url = this.apiUrl;
    return this.http.get<any[]>(url).pipe(
      map((result) => {
        return result;
      })
    );
  }

  getProjectById(id: number) {
    return this.http
      .get<any[]>(this.apiUrl)
      .pipe(map((project) => project.filter((project) => project.id === id)));
  }

  createProject(project: any) {
    return this.http.post(this.apiUrl, project);
  }

  deleteProject(projectId: any) {
    return this.http.delete(this.apiUrl, projectId);
  }

  editProject(project: any) {
    return this.http.put(this.apiUrl, project);
  }
}
