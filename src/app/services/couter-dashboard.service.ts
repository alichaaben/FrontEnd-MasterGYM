import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Counters } from '../model/couter-dashboard.model';
import { environment } from '../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})

export class CouterDashboardService {
  private apiUrl: string = `${environment.BackEndHost}/user`;
  private apiUrlCustomer: string = `${environment.BackEndHost}/customer`;
  private apiUrlSession: string = `${environment.BackEndHost}/training-sessions`;


  constructor(private http: HttpClient) { }

  public getTotalUsers(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }

  public getTotalCustomers(): Observable<number> {
    return this.http.get<number>(`${this.apiUrlCustomer}/count`);
  }

    public getTotalCoaches(): Observable<number> {
      const params = new HttpParams().set('roleName', "Coatch");
      return this.http.get<number>(`${this.apiUrl}/count-coach`, { params });
    }

  public getActiveSessionsCount(): Observable<number> {
    const today = new Date().toISOString().split('T')[0];
    return this.http.get<number>(`${this.apiUrlSession}/count/today?date=${today}`);
  }

}
