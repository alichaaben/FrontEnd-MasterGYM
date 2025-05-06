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
import { ListRoleComponent } from './UI/roles/list-role/list-role.component';
import { DashboardComponent } from './UI/dashboard/dashboard.component';
import { CreateRoleComponent } from './UI/roles/create-role/create-role.component';
import { UpdateRoleComponent } from './UI/roles/update-role/update-role.component';
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

const routes: Routes = [
  {
    path: '',
    redirectTo: 'MasterGYM/home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'MasterGYM',
    component: LandingPageComponent,
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
  // {
  //   path: 'admin',
  //   component: AdminTemplateComponent,
  //   children: [
  //     { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  //     { path: 'dashboard', component: DashboardComponent },


  //     /***************************** Admin ****************************************************/
  //     /*************** roles *************** */
  //     // { path: 'roles', component: ListRoleComponent },
  //     // { path: 'roles/create', component: CreateRoleComponent },
  //     // { path: 'roles/update', component: UpdateRoleComponent },

  //     /*************** Users *************** */
  //     { path: 'users', component: ListUsersComponent },
  //     { path: 'users/create', component: CreateUsersComponent },
  //     { path: 'users/update/:id', component: UpdateUsersComponent },

  //     /*************** customers *************** */
  //     { path: 'customers', component: AllClientComponent },
  //     { path: 'customers/create', component: CreateCustomerComponent },
  //     { path: 'customers/update/:id', component: UpdateCustomerComponent },

  //     /*************** customer-coatch *************** */
  //     { path: 'customer-coatch', component: ClientCoatchComponent },
  //     { path: 'customer-coatch/create', component: CraeteCoatchComponent },
  //     { path: 'customer-coatch/update/:id', component: UpdateCoatchComponent },

  //     /*************** schedule-calendar *************** */
  //     { path: 'schedule-calendar', component: ScheduleCalendarComponent },

  //     /*************** photo-gallery*************** */
  //     { path: 'photo-gallery', component: PhotoGalleryComponent },

  //     /*************** contact-msg*************** */
  //     { path: 'contact-msg', component: MessagesComponent },

  //     /*************** settings *************** */
  //     { path: 'settings', component: SettingComponent },



  //     /*************** Error Pages *************** */
  //     { path: 'error', component: ErrorPageComponent },
  //     { path: '**', component: ErrorPageComponent },
  //   ],
  // },

  {
    path: 'admin',
    component: AdminTemplateComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, data: { breadcrumb: 'Dashboard' } },
      { path: 'users', component: ListUsersComponent, data: { breadcrumb: 'Users' } },
       /*************** Users *************** */
      { path: 'users/create', component: CreateUsersComponent, data: { breadcrumb: 'Create User' } },
      { path: 'users/update/:id', component: UpdateUsersComponent, data: { breadcrumb: 'Update User' } },
      /*************** customers *************** */
      { path: 'customers', component: AllClientComponent, data: { breadcrumb: 'Customers' } },
      { path: 'customers/create', component: CreateCustomerComponent, data: { breadcrumb: 'Create Customer' } },
      { path: 'customers/update/:id', component: UpdateCustomerComponent, data: { breadcrumb: 'Update Customer' } },
       /*************** customer-coatch *************** */
      { path: 'customer-coatch', component: ClientCoatchComponent, data: { breadcrumb: 'Customer-Coatch' } },
      { path: 'customer-coatch/create', component: CraeteCoatchComponent, data: { breadcrumb: 'Create Coatch' } },
      { path: 'customer-coatch/update/:id', component: UpdateCoatchComponent, data: { breadcrumb: 'Update Coatch' } },
      /*************** schedule-calendar *************** */
      { path: 'schedule-calendar', component: ScheduleCalendarComponent, data: { breadcrumb: 'Calendar' } },
      /*************** photo-gallery*************** */
      { path: 'photo-gallery', component: PhotoGalleryComponent, data: { breadcrumb: 'Gallery' } },
      /*************** contact-msg*************** */
      { path: 'contact-msg', component: MessagesComponent, data: { breadcrumb: 'Messages' } },
      /*************** settings *************** */
      { path: 'settings', component: SettingComponent, data: { breadcrumb: 'Settings' } },

       /*************** Error Pages *************** */
      { path: 'error', component: ErrorPageComponent, data: { breadcrumb: 'Error' } },
      { path: '**', component: ErrorPageComponent, data: { breadcrumb: 'Not Found' } }
    ]
  }


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
