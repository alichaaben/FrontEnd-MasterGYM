import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrainingSession } from '../model/training-session.model';
import { environment } from '../../environments/environment.dev';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TrainingSessionService {
  private apiUrl: string = `${environment.BackEndHost}/training-sessions`;

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  getAllSessions(): Observable<TrainingSession[]> {
    return this.http.get<TrainingSession[]>(this.apiUrl);
  }

  getSessionsByDateRange(startDate: Date, endDate: Date): Observable<TrainingSession[]> {
    const start = this.formatDate(startDate);
    const end = this.formatDate(endDate);
    return this.http.get<TrainingSession[]>(`${this.apiUrl}/range`, {
      params: { start, end }
    });
  }

  createSession(session: TrainingSession): Observable<TrainingSession> {
    return this.http.post<TrainingSession>(this.apiUrl, session);
  }

  updateSession(session: TrainingSession): Observable<TrainingSession> {
    return this.http.put<TrainingSession>(this.apiUrl, session);
  }

  deleteSession(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }
}
