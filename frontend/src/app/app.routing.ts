import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { AuthGuard } from './core/guards/auth.guard';

import { P404Component } from './views/error/404.component';
import { LoginComponent } from './views/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    canActivate: [AuthGuard],
    children: [

      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },

      {
        path: 'multi-cluster',
        loadChildren: () => import('./views/multi-cluster/multi-cluster.module').then(m => m.MultiClusterModule)
      },
      {
        path: 'connections/:cluserId',
        loadChildren: () => import('./views/clusters/clusters.module').then(m => m.ClustersModule)
      },
      {
        path: 'managment',
        loadChildren: () => import('./views/managment/managment.module').then(m => m.ManagmentModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
