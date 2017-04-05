import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { MainContainer, MapContainer, AuthContainer, GridContainer } from './pages';
import { AuthService } from './services'

// Routing tree should has reflection in templates <route-outlet> instead of component selectors
export const routes: ModuleWithProviders = RouterModule.forRoot([
  {
    // default route
    path: '',
    component: MainContainer,
    // buildin property of router. This refers to canActivate in AuthService
    // canActivate: [AuthService],
    children: [
      { path: '', component: MapContainer },
      { path: 'tabela', component: GridContainer }
    ]
  },
  { path: 'auth', component: AuthContainer },
  // otherwise
  { path:'**', redirectTo: '' }
])