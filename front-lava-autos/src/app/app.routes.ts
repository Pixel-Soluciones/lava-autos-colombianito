import { Routes } from '@angular/router';
import { authGuard } from '@guards/auth.guard';
import { noAuthGuard } from '@guards/no-auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component')
        .then(c => c.LoginComponent),
        // canActivate: [noAuthGuard]
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/main/main.component')
        .then(c => c.MainComponent),
        // canActivate: [authGuard]
    },
    {
        path: 'list-services',
        loadComponent: () => import('./features/list-services/list-services.component')
        .then(c => c.ListServicesComponent),
        // canActivate: [authGuard]
    },
    {
        path: 'add-service',
        loadComponent: () => import('./features/add-service/add-service.component')
        .then(c => c.AddServiceComponent),
        // canActivate: [authGuard]
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/login'
    }
];
