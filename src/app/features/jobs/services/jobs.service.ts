import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { JOB_API } from "../../../api/jobs.api";

@Injectable({ providedIn: 'root' })
export class JobsService {

  constructor(private http: HttpClient) {}

  getJobs(page: number): Observable<any> {
    return this.http.get<any>(`${JOB_API.JOBS}?page=${page}`);
  }

  searchJobs(
    page: number,
    keyword: string = '',
    level: string = ''
  ): Observable<any> {

    let params = new HttpParams()
      .set('page', page);

    if (keyword) {
      params = params.set('search', keyword);
    }

    if (level) {
      params = params.set('level', level);
    }

    return this.http.get<any>(JOB_API.JOBS, { params });
  }
}
