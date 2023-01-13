import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
})
export class InboxComponent implements OnInit {
  public userRole: any;
  ngOnInit(): void {
    this.userRole = localStorage.getItem('user_role');
    if (this.userRole == 'sys_Admin') {
      this.router.navigateByUrl('/dashboard');
    }
  }

  constructor(private router: Router) {}
}
