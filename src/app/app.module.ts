import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageModule } from './landing-page/landing-page.module';
import { AdminTemplateModule } from './admin-template/admin-template.module';
import { LoginComponent } from './UI/login/login.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListUsersComponent } from './UI/users/list-users/list-users.component';
import { UpdateUsersComponent } from './UI/users/update-users/update-users.component';
import { CreateUsersComponent } from './UI/users/create-users/create-users.component';
import { ErrorPageComponent } from './UI/error-page/error-page.component';
import { CreateRoleComponent } from './UI/roles/create-role/create-role.component';
import { UpdateRoleComponent } from './UI/roles/update-role/update-role.component';
import { ListRoleComponent } from './UI/roles/list-role/list-role.component';
import { DashboardComponent } from './UI/dashboard/dashboard.component';
import { AllClientComponent } from './UI/clients/all-client/all-client.component';
import { ClientComponent } from './UI/clients/client/client.component';
import { CreateCustomerComponent } from './UI/clients/create-customer/create-customer.component';
import { UpdateCustomerComponent } from './UI/clients/update-customer/update-customer.component';
import { ScheduleCalendarComponent } from './UI/schedule-calendar/schedule-calendar.component';
import { PhotoGalleryComponent } from './UI/photo-gallery/photo-gallery.component';
import { MessagesComponent } from './UI/messages/messages.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppHttpInterceptor } from './interceptor/app-http.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListUsersComponent,
    UpdateUsersComponent,
    CreateUsersComponent,
    ErrorPageComponent,
    CreateRoleComponent,
    UpdateRoleComponent,
    ListRoleComponent,
    DashboardComponent,
    AllClientComponent,
    ClientComponent,
    CreateCustomerComponent,
    UpdateCustomerComponent,
    ScheduleCalendarComponent,
    PhotoGalleryComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LandingPageModule,
    AdminTemplateModule,
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AppHttpInterceptor,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
