import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album, AlbumDto } from '../model/album.model';
import { environment } from '../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private apiUrl: string = `${environment.BackEndHost}/albums`;

  constructor(private http: HttpClient) { }

  getAllAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.apiUrl);
  }

  getAlbumById(id: number): Observable<Album> {
    return this.http.get<Album>(`${this.apiUrl}/${id}`);
  }

  createAlbum(albumDto: AlbumDto): Observable<Album> {
    return this.http.post<Album>(this.apiUrl, albumDto);
  }

  updateAlbum(albumDto: AlbumDto): Observable<Album> {
    return this.http.put<Album>(this.apiUrl, albumDto);
  }

  deleteAlbum(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
