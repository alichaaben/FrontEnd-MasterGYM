import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactMessage } from '../model/contact-message.model';
import { environment } from '../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class ContactMessageService {
  private apiUrl: string = `${environment.BackEndHost}/contact-messages`;

  constructor(private http: HttpClient) {}

  getAllMessages(): Observable<ContactMessage[]> {
    return this.http.get<ContactMessage[]>(this.apiUrl);
  }

  getMessagesByStatus(status: string): Observable<ContactMessage[]> {
    return this.http.get<ContactMessage[]>(`${this.apiUrl}/status/${status}`);
  }

  searchMessages(query: string): Observable<ContactMessage[]> {
    return this.http.get<ContactMessage[]>(`${this.apiUrl}/search`, {
      params: { query }
    });
  }

  searchMessagesByStatus(status: string, query: string): Observable<ContactMessage[]> {
    return this.http.get<ContactMessage[]>(`${this.apiUrl}/search-status`, {
      params: { status, query }
    });
  }

  approveMessage(id: number): Observable<ContactMessage> {
    return this.http.patch<ContactMessage>(`${this.apiUrl}/${id}/status`, null, {
      params: { status: 'approved' }
    });
  }

  rejectMessage(id: number): Observable<ContactMessage> {
    return this.http.patch<ContactMessage>(`${this.apiUrl}/${id}/status`, null, {
      params: { status: 'rejected' }
    });
  }

  setPending(id: number): Observable<ContactMessage> {
    return this.http.patch<ContactMessage>(`${this.apiUrl}/${id}/status`, null, {
      params: { status: 'pending' }
    });
  }

  deleteMessage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getApprovedMessages(): Observable<ContactMessage[]> {
    return this.http.get<ContactMessage[]>(`${this.apiUrl}/approved`);
  }
}
