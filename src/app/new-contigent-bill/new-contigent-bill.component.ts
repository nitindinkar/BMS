import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-contigent-bill',
  templateUrl: './new-contigent-bill.component.html',
  styleUrls: ['./new-contigent-bill.component.scss']
})
export class NewContigentBillComponent implements OnInit{

  ngOnInit(): void {

    $.getScript('assets/js/adminlte.js');

  }

}
