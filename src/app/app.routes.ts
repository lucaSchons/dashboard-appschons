import { Routes } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'order', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'order', component: OrderComponent, canActivate: [AuthGuard]}
];
