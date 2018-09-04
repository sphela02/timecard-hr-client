import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonDataService } from '../common-data/common-data.service';
import { ApplicationMenuType, ApplicationMenuItem } from '../shared';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'tc-approval-menu',
  templateUrl: './approval-menu.component.html',
  styleUrls: ['./approval-menu.component.scss']
})
export class ApprovalMenuComponent implements OnInit, OnDestroy {

  componentDestroy$: Subject<boolean> = new Subject<boolean>();

  approvalMenuItems: ApplicationMenuItem[] = [];

  constructor(
    private _commonDataService: CommonDataService,
  ) { }

  ngOnInit() {

    this._commonDataService.getMenu(ApplicationMenuType.ApprovalMenu)
              .takeUntil(this.componentDestroy$)
              .subscribe((menuList: ApplicationMenuItem[]) => {
      this.approvalMenuItems = menuList;
    }); // end subscribe approval menu

  } // end ngOnInit

  ngOnDestroy(): void {
    this.componentDestroy$.next(true);
  }

} // end ApprovalMenuComponent
