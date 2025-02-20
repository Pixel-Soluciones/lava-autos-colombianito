import { Routes } from '@angular/router';
import { authGuard } from '@guards/auth.guard';
import { noAuthGuard } from '@guards/no-auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component')
        .then(c => c.LoginComponent),
        canActivate: [noAuthGuard]
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/main/main.component')
        .then(c => c.MainComponent),
        canActivate: [authGuard]
    },
    {
        path: 'list-services',
        loadComponent: () => import('./features/list-services/list-services.component')
        .then(c => c.ListServicesComponent),
        canActivate: [authGuard]
    },
    {
        path: 'add-service',
        loadComponent: () => import('./features/add-service/add-service.component')
        .then(c => c.AddServiceComponent),
        canActivate: [authGuard]
    },
    {
        path: 'employees',
        loadComponent: () => import('./features/employees/employees.component'),
        canActivate: [authGuard]
    },
    {
        path: 'employees/new',
        loadComponent: () => import('./features/employees/employee-form/employee-form.component'),
        canActivate: [authGuard]
    },
    {
        path: 'reports',
        loadComponent: () => import('./features/reports/reports.component')
        .then(c => c.ReportsComponent),
        canActivate: [authGuard]
    },
    {
        path: 'vehicles',
        loadComponent: () => import('./features/vehicles/vehicles.component')
        .then(c => c.VehiclesComponent),
        canActivate: [authGuard]
    },
    {
        path: 'nuevo-ingreso',
        loadComponent: () => import('./features/entry/entry.component')
        .then(c => c.EntryComponent),
        canActivate: [authGuard]
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
