import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Job } from "../../../core/model/job.model";
import { JOB_API } from "../../../api/jobs.api";
import { BASE_JOB_API } from "../../../api/api.base";

@Injectable({providedIn : 'root'})

export class JobsService{

    constructor(private http: HttpClient){}

    getJobs(): Observable<any>{
        return this.http.get<any>(`${JOB_API.JOBS}?page=1`);
    }
}