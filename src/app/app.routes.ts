import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { 
  ProductComponent, 
  AddProductComponent 
} from './product';
import { LoginComponent } from './login';
import { LogoutComponent } from './logout';
import { NoContentComponent } from './no-content';
import { AuthGuard } from './auth-guard.service';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'product',  component: ProductComponent, canActivate: [AuthGuard], children: [
    {path: 'add', component: AddProductComponent, outlet: 'sidebar'}
  ]},
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  // { path: 'detail', loadChildren: './+detail#DetailModule'},
  // { path: 'barrel', loadChildren: './+barrel#BarrelModule'},
  { path: '**',    component: NoContentComponent },
];
