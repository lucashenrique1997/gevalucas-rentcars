import {Component} from '@angular/core';

//todo get user and show something about login here (hide tabs 2 and 3 for user and tab 1 for op using the isOp flag)
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  isOp: boolean;

  constructor() {
    this.isOp = window.localStorage.getItem('isOp') === 'true';
    console.log('isOp ===>', this.isOp);
  }

}
