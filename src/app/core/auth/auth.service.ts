import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Register } from "../../features/auth/register/register";
import { AUTH_API } from "../../api/auth.api";
import { Router } from '@angular/router';

@Injectable({providedIn : 'root'})

export class authService{

    constructor(
     private http: HttpClient,
     private router: Router
    ){}

    registerUser(user: Register): Observable<Register>{
        return this.http.post<Register>(AUTH_API.REGISTER,user);
    }

    checkEmail(email: string){
           return this.http.get<Register[]>(`${AUTH_API.LOGIN}?email=${email}`);
    }

    lgoInUser(email: string , password: string): Observable<any[]>{
        const params = new HttpParams()
        .set('email' , email)
        .set('password', password)
        return this.http.get<any[]>(AUTH_API.LOGIN,{ params })
    }

    logout(){
       sessionStorage.removeItem('user');
       this.router.navigate(['/']);
    }

    isAuthenticated(){
        return !!sessionStorage.getItem('user');
    }


    getLoggedInUser(){
        const data = sessionStorage.getItem('user');
        return data ? JSON.parse(data) : null;
    }

}