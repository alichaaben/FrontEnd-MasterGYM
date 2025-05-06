import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.dev';
import { CustomerModel } from './../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl: string = `${environment.BackEndHost}/customer`;
  private apiUrlByIdUser: string = `${environment.BackEndHost}/customer/`;

  constructor(private http: HttpClient) {}

  public getAllCustomer(): Observable<CustomerModel[]> {
    return this.http.get<CustomerModel[]>(this.apiUrl);
  }

  public getCustomerById(id: string): Observable<CustomerModel> {
    return this.http.get<CustomerModel>(`${this.apiUrl}/${id}`);
  }

  public getAllByUserName(username: string): Observable<CustomerModel> {
    const params = new HttpParams().set('userName', username);
    return this.http.get<CustomerModel>(`${this.apiUrl}/filtre-name`, { params });
  }



  public getAllCustomerByUserId(id: string): Observable<CustomerModel[]> {
    return this.http.get<CustomerModel[]>(`${this.apiUrl}/filtre-user/${id}`);
  }

  public addCustomer(customer: CustomerModel, profileImage: File | null): Observable<CustomerModel> {
    const formData = this.buildFormData(customer, profileImage);
    return this.http.post<CustomerModel>(this.apiUrl, formData);
  }

  public updateCustomer(customer: CustomerModel, profileImage: File | null): Observable<CustomerModel> {
    const formData = this.buildFormData(customer, profileImage);
    return this.http.put<CustomerModel>(this.apiUrl, formData);

  }

  public deleteCustomer(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private buildFormData(customer: CustomerModel, profileImage: File | null): FormData {
    const formData = new FormData();
    if (customer.id) formData.append('id', customer.id);
    formData.append('userId', customer.userId.toString());
    formData.append('userName', customer.userName);
    formData.append('email', customer.email);
    formData.append('telephone', customer.telephone);
    formData.append('pack', customer.pack);
    formData.append('dateDebut', this.formatDate(customer.dateDebut));
    formData.append('dateFin', this.formatDate(customer.dateFin));
    formData.append('montPay', customer.montPay.toString());

    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    return formData;
  }

  private formatDate(date: Date | string): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}
