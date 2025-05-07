import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.dev';
import { UserModel } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = `${environment.BackEndHost}/user`;

  constructor(private http: HttpClient) { }

  public getAllUser(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.apiUrl);
  }

  public getUserById(id: string): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.apiUrl}/${id}`);
  }

  searchUsers(query: string): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.apiUrl}/search`, {
      params: { query }
    });
  }

  updateUserPassword(userId: number, newPassword: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/password`, {
      id: userId,
      motDePasse: newPassword
    });
  }


  public getAllByUserName(username: string): Observable<UserModel> {
    const params = new HttpParams().set('userName', username);
    return this.http.get<UserModel>(`${this.apiUrl}/filtre`, { params });
  }

  public getAllByRoleName(rolename: string): Observable<UserModel[]> {
    const params = new HttpParams().set('roleName', rolename);
    return this.http.get<UserModel[]>(`${this.apiUrl}/by-role`, { params });
  }

  public addUser(user: UserModel, profileImage: File | null): Observable<UserModel> {
    const formData = new FormData();
    formData.append('userName', user.userName);
    formData.append('email', user.email);
    formData.append('telephone', user.telephone);
    formData.append('motDePasse', user.motDePasse);
    formData.append('roleName', user.roleName);
    formData.append('description', user.description);

    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    return this.http.post<UserModel>(this.apiUrl, formData);
  }



  public updateUser(user: UserModel, profileImage: File | null): Observable<UserModel> {
    const formData = new FormData();
    formData.append('id', user.id);
    formData.append('userName', user.userName);
    formData.append('email', user.email);
    formData.append('telephone', user.telephone);
    formData.append('motDePasse', user.motDePasse);
    formData.append('roleName', user.roleName);
    formData.append('description', user.description);

    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    return this.http.put<UserModel>(this.apiUrl, formData);
  }

  public deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}





