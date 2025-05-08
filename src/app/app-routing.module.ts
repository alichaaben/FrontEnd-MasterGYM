import { UpdateCoatchComponent } from './UI/clients/update-coatch/update-coatch.component';
import { CraeteCoatchComponent } from './UI/clients/craete-coatch/craete-coatch.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomePageComponent } from './landing-page/home-page/home-page.component';
import { AboutComponent } from './landing-page/about/about.component';
import { ServicesComponent } from './landing-page/services/services.component';
import { ContactComponent } from './landing-page/contact/contact.component';
import { LoginComponent } from './UI/login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { DashboardComponent } from './UI/dashboard/dashboard.component';
import { ListUsersComponent } from './UI/users/list-users/list-users.component';
import { CreateUsersComponent } from './UI/users/create-users/create-users.component';
import { UpdateUsersComponent } from './UI/users/update-users/update-users.component';
import { ErrorPageComponent } from './UI/error-page/error-page.component';
import { AllClientComponent } from './UI/clients/all-client/all-client.component';
import { CreateCustomerComponent } from './UI/clients/create-customer/create-customer.component';
import { UpdateCustomerComponent } from './UI/clients/update-customer/update-customer.component';
import { ScheduleCalendarComponent } from './UI/schedule-calendar/schedule-calendar.component';
import { PhotoGalleryComponent } from './UI/photo-gallery/photo-gallery.component';
import { MessagesComponent } from './UI/messages/messages.component';
import { ClientCoatchComponent } from './UI/clients/client-coatch/client-coatch.component';
import { SettingComponent } from './UI/setting/setting.component';
import { authGuard } from './guards/auth-gard.guard';
import { authorizGardGuardAdmin, authorizGardGuardCoach } from './guards/authoriz-gard.guard';
import { LoginRegisterComponent } from './UI/login-register/login-register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'MasterGYM/home',
    pathMatch: 'full',
  },
  {
    path: 'MasterGYM',
    component: LandingPageComponent
  },
  {
    path: 'MasterGYM',
    component: LandingPageComponent,
    children: [
      {
        path: 'home',
        component: HomePageComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'services',
        component: ServicesComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
    ]
  },

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminTemplateComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard', component: DashboardComponent,
        canActivate: [authorizGardGuardAdmin],
        data: { role: 'ROLE_Admin', breadcrumb: 'Dashboard' },
      },
      {
        path: 'users', component: ListUsersComponent,
        canActivate: [authorizGardGuardAdmin],
        data: { role: 'ROLE_Admin', breadcrumb: 'Users' },
      },
      /*************** Users *************** */
      {
        path: 'users/create', component: CreateUsersComponent,
        canActivate: [authorizGardGuardAdmin],
        data: { role: 'ROLE_Admin', breadcrumb: 'Users' },
      },
      {
        path: 'users/update/:id', component: UpdateUsersComponent,
        canActivate: [authorizGardGuardAdmin],
        data: { role: 'ROLE_Admin', breadcrumb: 'Users' },
      },

      /*************** customers *************** */
      {
        path: 'customers', component: AllClientComponent,
        canActivate: [authorizGardGuardAdmin],
        data: { role: 'ROLE_Admin', breadcrumb: 'Customers' },
      },
      {
        path: 'customers/create', component: CreateCustomerComponent,
        canActivate: [authorizGardGuardCoach],
        data: { role: ['ROLE_Admin', 'ROLE_Coach'], breadcrumb: 'Users' },
      },
      {
        path: 'customers/update/:id', component: UpdateCustomerComponent,
        canActivate: [authorizGardGuardCoach],
        data: { role: ['ROLE_Admin', 'ROLE_Coach'], breadcrumb: 'Update Customer' },
      },

      /*************** customer-coatch *************** */
      {
        path: 'customer-coatch', component: ClientCoatchComponent,
        canActivate: [authorizGardGuardCoach],
        data: { role: ['ROLE_Admin', 'ROLE_Coach'], breadcrumb: 'Customers' },
      },
      {
        path: 'customer-coatch/create', component: CraeteCoatchComponent,
        canActivate: [authorizGardGuardCoach],
        data: { role: ['ROLE_Admin', 'ROLE_Coach'], breadcrumb: 'Create Customers' },
      },
      {
        path: 'customer-coatch/update/:id', component: UpdateCoatchComponent,
        canActivate: [authorizGardGuardCoach],
        data: { role: ['ROLE_Admin', 'ROLE_Coach'], breadcrumb: 'Update Customers' },
      },

      /*************** schedule-calendar *************** */
      {
        path: 'schedule-calendar', component: ScheduleCalendarComponent,
        canActivate: [authorizGardGuardCoach],
        data: { role: ['ROLE_Admin', 'ROLE_Coach'], breadcrumb: 'Calendar' },
      },

      /*************** photo-gallery*************** */
      {
        path: 'photo-gallery', component: PhotoGalleryComponent,
        canActivate: [authorizGardGuardCoach],
        data: { role: ['ROLE_Admin', 'ROLE_Coach'], breadcrumb: 'Gallery' },
      },

      /*************** contact-msg*************** */
      {
        path: 'contact-msg', component: MessagesComponent,
        canActivate: [authorizGardGuardCoach],
        data: { role: ['ROLE_Admin', 'ROLE_Coach'], breadcrumb: 'Messages' },
      },

      /*************** settings *************** */
      {
        path: 'settings', component: SettingComponent,
        canActivate: [authorizGardGuardCoach],
        data: { role: ['ROLE_Admin', 'ROLE_Coach'], breadcrumb: 'Settings' },
      },

      /*************** Error Pages *************** */
      {
        path: 'error', component: ErrorPageComponent,
        data: { breadcrumb: 'Error' },
      },
      {
        path: '**', component: ErrorPageComponent,
        data: { breadcrumb: 'Not Found' },
      }
    ]
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
