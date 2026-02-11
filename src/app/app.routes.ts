import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Landing } from './features/jobs/pages/landing/landing';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Features } from './features/features';
import { Home } from './features/jobs/pages/home/home';
import { ApplicationComponent } from './features/jobs/pages/application/application';
import { Profile } from './features/profile/profile';
import { FavoritePage } from './features/jobs/pages/favorites/favorite-page/favorite-page';

export const routes: Routes = [
    {
        path : '',
        component : Features,
        children : [
            {
                path : '',
                component : Landing
            },
            {
                path : 'home',
                component : Home
            },
            {
                path : 'applications',
                component : ApplicationComponent
            },
            {
                path : 'profile',
                component : Profile
            },
            {
                path : 'favorites',
                component : FavoritePage
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
