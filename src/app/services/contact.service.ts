import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactUser } from '../model/contact-user.model';
import { environment } from '../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl: string = `${environment.BackEndHost}/contact-messages`;

  constructor(private http: HttpClient) { }

  public sendMessage(user: ContactUser): Observable<ContactUser> {
    const payload = {
      name: user.name,
      email: user.email,
      message: user.message,
      status: user.status.toUpperCase()
    };

    return this.http.post<ContactUser>(this.apiUrl, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
