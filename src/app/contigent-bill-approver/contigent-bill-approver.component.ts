import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-contigent-bill-approver',
  templateUrl: './contigent-bill-approver.component.html',
  styleUrls: ['./contigent-bill-approver.component.scss']
})
export class ContigentBillApproverComponent implements OnInit{

  ngOnInit(): void {

    $.getScript('assets/js/adminlte.js');

  }

}
