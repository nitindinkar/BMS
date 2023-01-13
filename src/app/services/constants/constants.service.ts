import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  constructor() {}

  // serviceUrl = 'https://icg.net.in/cgwwa/'; //prod
  serviceUrl = 'http://1ab4-203-153-42-234.ngrok.io/'; //dev

  api = {
    getDataBudgetAllocation:
      this.serviceUrl + 'BudgetAllocation/getDataBudgetAllocation',
    getAvailableFund: this.serviceUrl + 'BudgetAllocation/getAvailableFund',
  };
}
