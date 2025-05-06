import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Photo, PhotoDto } from '../model/photo.model';
import { environment } from '../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private apiUrl: string = `${environment.BackEndHost}/photos`;

  constructor(private http: HttpClient) { }

  getAllPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.apiUrl);
  }

  getPhotosByAlbum(albumId: number): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.apiUrl}/album/${albumId}`);
  }

  getPhotoById(id: number): Observable<Photo> {
    return this.http.get<Photo>(`${this.apiUrl}/${id}`);
  }

  createPhoto(photoDto: PhotoDto): Observable<Photo> {
    const formData = new FormData();
    formData.append('name', photoDto.name);
    formData.append('description', photoDto.description);
    formData.append('albumId', photoDto.albumId.toString());
    if (photoDto.photoImage) {
      formData.append('photoImage', photoDto.photoImage);
    }

    return this.http.post<Photo>(this.apiUrl, formData);
  }

  updatePhoto(id: number, photoDto: PhotoDto): Observable<Photo> {
    const formData = new FormData();
    formData.append('name', photoDto.name);
    formData.append('description', photoDto.description);
    formData.append('albumId', photoDto.albumId.toString());
    if (photoDto.photoImage) {
      formData.append('photoImage', photoDto.photoImage);
    }

    return this.http.put<Photo>(`${this.apiUrl}/${id}`, formData);
  }


  deletePhoto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
