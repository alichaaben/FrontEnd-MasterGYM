import { SharedService } from './../services/shared.service';
import { Component } from '@angular/core';



@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {
  isSidebarActive: boolean = false;

  constructor(private sharedService: SharedService) {
    this.sharedService.currentSidebarState.subscribe(state => {
      this.isSidebarActive = state;
    });
  }
}
