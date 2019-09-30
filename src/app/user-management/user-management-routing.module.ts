import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PlaylistComponent} from '../playlist/playlist/playlist.component';
import {PlaylistListComponent} from '../playlist/playlist-list/playlist-list.component';
import {CreatePlaylistComponent} from '../playlist/create-playlist/create-playlist.component';
import {EditPlaylistComponent} from '../playlist/edit-playlist/edit-playlist.component';
import {DeletePlaylistComponent} from '../playlist/delete-playlist/delete-playlist.component';
import {UserListComponent} from './user-list/user-list.component';
import {UserManagementComponent} from './user-management/user-management.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path:  '',
    component: UserManagementComponent,
    children: [
      {
        path: 'list',
        component: UserListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
