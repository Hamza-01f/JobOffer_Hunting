import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Register } from "../../features/auth/register/register";
import { AUTH_API } from "../../api/auth.api";

@Injectable({providedIn : 'root'})

export class authService{

    constructor(
     private http: HttpClient
    ){}

    registerUser(user: Register): Observable<Register>{
        return this.http.post<Register>(AUTH_API.REGISTER,user);
    }

    checkEmail(email: string){
           return this.http.get<Register[]>(`${AUTH_API.LOGIN}?email=${email}`);
    }

    lgoInUser(email: string , password: string){
          return this.http.get<Register[]>(
            `${AUTH_API.LOGIN}?email=${email}&password=${password}`
        );
    }

    logout(){

    }

    isAuthenticated(){

    }
}