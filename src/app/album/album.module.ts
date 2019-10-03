import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumRoutingModule } from './album-routing.module';
import { AlbumComponent } from './album/album.component';
import { AlbumListComponent } from './album-list/album-list.component';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { UploadAlbumComponent } from './upload-album/upload-album.component';
import { EditAlbumComponent } from './edit-album/edit-album.component';
import { DeleteAlbumComponent } from './delete-album/delete-album.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [AlbumComponent, AlbumListComponent, AlbumDetailComponent, UploadAlbumComponent, EditAlbumComponent, DeleteAlbumComponent],
  imports: [
    CommonModule,
    AlbumRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class AlbumModule { }
