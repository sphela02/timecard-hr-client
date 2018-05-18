import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CommonDataService {

  public impersonateUserID: string = '';
  public currentErrorMessages: string[] = [];
  public observableDiagnosticMessages: string[] = [];

  private pageTitleSource = new BehaviorSubject<string>('Timecard');
  currentPageTitle = this.pageTitleSource.asObservable();

  constructor() { }

  changePageTitle(title: string) {
    this.pageTitleSource.next(title);
  }
}
