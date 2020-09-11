import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { CrearEstudianteComponent } from '../../pages/crear-estudiante/crear-estudiante.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'crear-estudiante',          component: CrearEstudianteComponent },
    { path: 'maps',           component: MapsComponent }
];
