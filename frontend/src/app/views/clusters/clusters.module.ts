import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ClusterEventsComponent } from './cluster-events/cluster-events.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NodeListComponent } from './node-list/node-list.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'Dashboard'
    },
    
  },

  {
    path: 'namespaces',
    data: {
      title: 'Name Spaces'
    },
    loadChildren: () => import('../name-space/name-space.module').then(m => m.NameSpaceModule)
  }
];



@NgModule({
  declarations: [
    DashboardComponent,
    NodeListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
   
  ]
})
export class ClustersModule { }
