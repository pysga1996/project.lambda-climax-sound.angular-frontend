import { Component, OnInit } from '@angular/core';
import {AlbumService} from '../../service/album.service';
import {Album} from '../../model/album';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent implements OnInit {
  private pageNumber: number;
  private pageSize: number;
  private totalItems: number;
  private message;
  private albumList: Album[];

  constructor(private albumService: AlbumService) { }

  ngOnInit() {
    this.albumService.getAlbumList().subscribe(
      result => {
        if (result != null) {
          this.albumList = result.content;
          this.albumList.forEach((value, index) => {
            this.albumList[index].isDisabled = false;
          });
          this.pageNumber = result.pageable.pageNumber;
          this.pageSize = result.pageable.pageSize;
        }
      }, error => {
        this.message = 'Cannot retrieve album list. Cause: ' + error.songsMessage;
      });
  }

}
