import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of, shareReplay } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://api.github.com/users/Karam-Samer/repos';
  private repos$?: Observable<Project[]>;

  getRepos(): Observable<Project[]> {
    if (!this.repos$) {
      this.repos$ = this.http
        .get<Project[]>(this.apiUrl, {
          params: {
            per_page: '100',
            sort: 'updated',
            direction: 'desc',
            type: 'public',
          },
        })
        .pipe(
          map((repos) =>
            repos
              .filter(
                (repo) =>
                  !repo.fork &&
                  !repo.archived &&
                  repo.description !== null &&
                  repo.description.toLowerCase().includes('portfolio')
              )
              .sort(
                (a, b) =>
                  new Date(b.updated_at).getTime() -
                  new Date(a.updated_at).getTime()
              )
          ),
          catchError(() => of([])),
          shareReplay(1)
        );
    }
    return this.repos$;
  }
}
