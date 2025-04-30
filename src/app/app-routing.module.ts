import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'MasterGYM',
    pathMatch: 'full',
  },
  // {
  //   path:'login',
  //   component:LoginComponent,
  // },
  {
    path: 'MasterGYM',
    component: LandingPageComponent,
  }
  //,{
    // path: 'Admin',
    // component: AdminTemplateComponent,
    // children: [
    //   {
    //     path: 'dashboard',
    //     component: DashboardComponent,
    //   },
    //   {
    //     path: 'Profil',
    //     component: ProfilComponent,
    //   },
    //   {
    //     path: 'Settings',
    //     component: SettingComponent,
    //   },

      /*************** Users *************** */
      // {
      //   path: 'Users',
      //   component: ListUsersComponent,
      // },
      // {
      //   path: 'Create-Users',
      //   component: CreateUsersComponent,
      // },
      // {
      //   path: 'Update-Users',
      //   component: UpdateUsersComponent,
      // },

      /*************** Billings *************** */
      // {
      //   path: 'Billings',
      //   component: ListBillsComponent,
      // },
      // {
      //   path: 'Creates-Billings',
      //   component: CreateBillsComponent,
      // },
      // {
      //   path: 'Update-Billings',
      //   component: UpdateBillsComponent,
      // },
      // {
      //   path: 'Details-Billings',
      //   component: DetailsBillsComponent,
      // },

      /*************** Materials *************** */
      // {
      //   path: 'Materials',
      //   component: ListMatComponent,
      // },
      // {
      //   path: 'Creates-Materials',
      //   component: CreateMatComponent,
      // },
      // {
      //   path: 'Update-Materials',
      //   component: UpdateMatComponent,
      // },
      // {
      //   path: 'store-Materials',
      //   component: StoreMatComponent,
      // },
      // {
      //   path: 'details-Materials',
      //   component: DetailsMatComponent,
      // },

      /*************** Ro-Systems *************** */

      // {
      //   path: 'RO-Systems',
      //   component: RoSystemComponent,
      // },

    //],
  //},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
