import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { AdminTemplateComponent } from './admin-template.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    HeaderComponent,
    BodyComponent,
    SidebarComponent,
    AdminTemplateComponent
  ],
  imports: [
    RouterModule,
    CommonModule,

  ]
})
export class AdminTemplateModule { }
