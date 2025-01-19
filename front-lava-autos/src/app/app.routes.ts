import { Routes } from '@angular/router';
import { authGuard } from '@guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component')
        .then(c => c.LoginComponent)
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/main/main.component')
        .then(c => c.MainComponent),
        canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: '/login'
    }
];
