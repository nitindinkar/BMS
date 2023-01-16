import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  constructor() {}

  // serviceUrl = 'https://icg.net.in/cgwwa/'; //prod
  serviceUrl = 'http://0e71-103-120-30-82.ngrok.io/'; //dev

  api = {
    getDataBudgetAllocation:
      this.serviceUrl + 'BudgetAllocation/getDataBudgetAllocation',
    getAvailableFund: this.serviceUrl + 'BudgetAllocation/getAvailableFund',
    fileUpload: this.serviceUrl + 'fileUpload/uploadFile',
  };
}
