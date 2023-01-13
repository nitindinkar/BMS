import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  public userRole: any;

  ngOnInit(): void {
    this.userRole = localStorage.getItem('user_role');
    console.log('Role of user == ' + this.userRole);
  }

  constructor() {}
}
