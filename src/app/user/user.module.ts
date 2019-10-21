import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserRoutingModule} from './user-routing.module';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {UserComponent} from './user/user.component';
import {SharedModule} from '../shared/shared.module';
import {NgxAudioPlayerModule} from 'ngx-audio-player';
import {UpdateProfileComponent} from './update-profile/update-profile.component';
import {SongModule} from '../song/song.module';
import {NgbButtonsModule, NgbPaginationModule, NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';
import {SearchComponent} from './search/search.component';
import {UploadedSongListComponent} from './uploaded-song-list/uploaded-song-list.component';
import {FavoritesComponent} from './favorites/favorites.component';
import { ProfileComponent } from './profile/profile.component';
import { UserProfileComponent } from './user-management/user-profile/user-profile.component';
import {PlaylistModule} from '../playlist/playlist.module';

@NgModule({
  declarations: [HomeComponent, RegisterComponent, UserComponent, UpdateProfileComponent,
      SearchComponent, UploadedSongListComponent, FavoritesComponent, ProfileComponent, UserProfileComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    SharedModule,
    NgxAudioPlayerModule,
    SongModule,
    NgbPaginationModule,
    NgbTabsetModule,
    FormsModule,
    NgbButtonsModule,
    PlaylistModule
  ],
  exports: [HomeComponent, RegisterComponent, UserComponent, UpdateProfileComponent, SearchComponent]
})
export class UserModule {
}
