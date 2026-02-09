import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Landing } from './features/jobs/pages/landing/landing';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Features } from './features/features';

export const routes: Routes = [
    {
        path : '',
        component : Features,
        children : [
            {
                path : '',
                component : Landing
            }
        ]
    },
    {
        path : 'login',
        component : Login
    },
    {
        path : 'register',
        component : Register
    }
];
