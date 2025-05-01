import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomePageComponent } from './landing-page/home-page/home-page.component';
import { AboutComponent } from './landing-page/about/about.component';
import { ServicesComponent } from './landing-page/services/services.component';
import { ContactComponent } from './landing-page/contact/contact.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'MasterGYM/home',
    pathMatch: 'full',
  },
  // {
  //   path:'login',
  //   component:LoginComponent,
  // },
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
