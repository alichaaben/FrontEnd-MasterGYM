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
import { CreateCustomerComponent } from './UI/clients/create-customer/create-customer.component';
import { UpdateCustomerComponent } from './UI/clients/update-customer/update-customer.component';
import { ScheduleCalendarComponent } from './UI/schedule-calendar/schedule-calendar.component';
import { PhotoGalleryComponent } from './UI/photo-gallery/photo-gallery.component';
import { MessagesComponent } from './UI/messages/messages.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppHttpInterceptor } from './interceptor/app-http.interceptor';
import { ClientCoatchComponent } from './UI/clients/client-coatch/client-coatch.component';
import { CraeteCoatchComponent } from './UI/clients/craete-coatch/craete-coatch.component';
import { UpdateCoatchComponent } from './UI/clients/update-coatch/update-coatch.component';
import { DatePipe } from '@angular/common';


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
    CreateCustomerComponent,
    UpdateCustomerComponent,
    ScheduleCalendarComponent,
    PhotoGalleryComponent,
    MessagesComponent,
    ClientCoatchComponent,
    CraeteCoatchComponent,
    UpdateCoatchComponent
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
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
