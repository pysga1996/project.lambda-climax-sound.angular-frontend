import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Song} from '../model/song';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient) {
  }

  getSongList(page?: number, sort?: string) {
    let requestUrl = `${environment.apiUrl}/song/list`;
    if (page || sort) {
      requestUrl = requestUrl + `?`;
      if (page) {
        requestUrl = requestUrl + `page=${page}`;
        if (sort) {
          requestUrl = requestUrl + `&`;
        }
      }
      if (sort) {
        requestUrl = requestUrl + `sort=${sort}`;
      }
    }
    console.log(requestUrl);
    return this.http.get<any>(requestUrl);
  }

  updateSong(song: any, id: number): Observable<HttpEvent<any>> {
    // @ts-ignore
    return this.http.put<any>(`${environment.apiUrl}/song/edit?id=${id}`, song, {
      observe: 'events',
      reportProgress: true,
    });
  }

  uploadSong(formData): Observable<HttpEvent<any>> {
    return this.http.post<any>(`${environment.apiUrl}/song/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  addSongToPlaylist(songId: number, playlistId: number) {
    return this.http.post(`${environment.apiUrl}/song/add-to-playlist?songId=${songId}&playlistId=${playlistId}`, '');
  }

  getdetailSong(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/song/detail?id=${id}`);
  }

  deletePlaylistSong(songId: number, playlistId: number): Observable<HttpEvent<any>> {
    return this.http.put<any>
    (`${environment.apiUrl}/playlist/remove-song?songId=${songId}&playlistId=${playlistId}`, {responseType: 'text'});
  }

  listenToSong(songId: number) {
    return this.http.post<any>(`${environment.apiUrl}/song?listen&song-id=${songId}`, {});
  }

  likeSong(songId: number) {
    return this.http.post<any>(`${environment.apiUrl}/song?like&song-id=${songId}`, {});
  }

  unlikeSong(songId: number) {
    return this.http.post<any>(`${environment.apiUrl}/song?unlike&song-id=${songId}`, {});
  }
  getUserSongList() {
    return this.http.get<any>(`${environment.apiUrl}/song/uploaded/list`);
  }
  deleteSong(id: number) {
    return this.http.delete<any>(`${environment.apiUrl}/song/delete?id=${id}`);
  }
  commentSong(songId: number, comment: Comment) {
  return this.http.post<any>(`${environment.apiUrl}/song?comment&song-id=${songId}`, comment);
  }
}
