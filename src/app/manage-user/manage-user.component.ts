import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit{

  ngOnInit(): void {

    $.getScript('assets/js/adminlte.js');

  }

}
