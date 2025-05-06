import { Component } from '@angular/core';
import { SharedService } from './../services/shared.service';
import { BreadcrumbService, Breadcrumb } from '../services/breadcrumb.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {
  isSidebarActive = false;
  breadcrumbs: Breadcrumb[] = [];

  constructor(
    private sharedService: SharedService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.sharedService.currentSidebarState.subscribe(state => {
      this.isSidebarActive = state;
    });

    this.breadcrumbService.breadcrumbs$.subscribe(b => {
      this.breadcrumbs = b;
    });
  }
}
