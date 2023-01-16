import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  constructor() {}

  // serviceUrl = 'https://icg.net.in/cgwwa/'; //prod
  serviceUrl = 'http://e20c-103-47-18-6.ngrok.io/'; //dev

  api = {
    getDataBudgetAllocation:
      this.serviceUrl + 'BudgetAllocation/getDataBudgetAllocation',
    getAvailableFund: this.serviceUrl + 'BudgetAllocation/getAvailableFund',
    fileUpload: this.serviceUrl + 'fileUpload/uploadFile',
    saveBudgetAllocation:
      this.serviceUrl + 'BudgetAllocation/saveBudgetAllocation',
  };
}
