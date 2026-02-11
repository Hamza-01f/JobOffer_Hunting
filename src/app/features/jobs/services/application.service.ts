import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Application } from "../../../core/model/application.model";
import { BASE_API } from "../../../api/api.base";
import { APP_API } from "../../../api/application.api";

@Injectable({
    providedIn: 'root'
})


export class ApplicationService{


    constructor(
        private http: HttpClient
    ){

    }

    getByUser(userId: number): Observable<Application[]>{
        return this.http.get<Application[]>(`${APP_API.APP}?userId=${userId}`)
    }

    getByUserAndOffer(userId: number, offerId: string) {
    return this.http.get<Application[]>(
      `${APP_API.APP}?userId=${userId}&offerId=${offerId}`
    );
    }

    create(app: Application) {
        return this.http.post<Application>(APP_API.APP, app);
    }

    update(id: number, data: Partial<Application>) {
        return this.http.patch(`${APP_API.APP}/${id}`, data);
    }

    delete(id: number) {
        return this.http.delete(`${APP_API.APP}/${id}`);
    }
}