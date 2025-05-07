import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Photo, PhotoDto } from '../model/photo.model';
import { environment } from '../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private apiUrl: string = `${environment.BackEndHost}/photos`;

  constructor(private http: HttpClient) {}

  getAllPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.apiUrl);
  }

  createPhoto(photoDto: PhotoDto): Observable<Photo> {
    const formData = this.createFormData(photoDto);
    return this.http.post<Photo>(this.apiUrl, formData);
  }

  createPhotoFormData(formData: FormData): Observable<HttpEvent<Photo>> {
    const req = new HttpRequest('POST', this.apiUrl, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  updatePhoto(id: number, photoDto: PhotoDto): Observable<Photo> {
    const formData = this.createFormData(photoDto);
    return this.http.put<Photo>(`${this.apiUrl}/${id}`, formData);
  }

  updatePhotoFormData(formData: FormData): Observable<Photo> {
    return this.http.put<Photo>(this.apiUrl, formData);
  }

  deletePhoto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private createFormData(photoDto: PhotoDto): FormData {
    const formData = new FormData();
    formData.append('name', photoDto.name);
    formData.append('description', photoDto.description || '');
    formData.append('albumId', photoDto.albumId.toString());

    if (photoDto.photoImage) {
      formData.append('photoImage', photoDto.photoImage);
    }

    return formData;
  }

}
