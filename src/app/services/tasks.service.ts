import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  private apiUrl = `https://jsonplaceholder.typicode.com/todos`;

  getTasks() {
    let url = this.apiUrl;
    return this.http.get<any[]>(url).pipe(
      map((result) => {
        return result;
      })
    );
  }

  getTasksByProjectId(projectId: number): Observable<any[]> {
    return this.http
      .get<any[]>(this.apiUrl)
      .pipe(map((tasks) => tasks.filter((task) => task.userId === projectId)));
  }

  getTaskById(taskId: number) {
    return this.http
      .get<any[]>(this.apiUrl)
      .pipe(map((tasks) => tasks.filter((task) => task.id === taskId)));
  }

  createTask(task: any) {
    return this.http.post(this.apiUrl, task);
  }

  deleteTask(taskId: any) {
    return this.http.delete(this.apiUrl, taskId);
  }

  
  editTask(task: any) {
    return this.http.put(this.apiUrl, task);
  }
}
