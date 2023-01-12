import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  ngOnInit(): void {
    if (!localStorage.getItem("foo")) {
      localStorage.setItem("foo", "no reload");
      location.reload();
    } else {
      localStorage.removeItem("foo");
    }
  }
}
