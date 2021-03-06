import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MqIfDirective } from './mq-if/mq-if.directive';
import { ObjectFilter } from './pipes/objectFilter';
import { ObjectSum } from './pipes/objectSum';
import { AppLandingComponent } from './app-landing/app-landing.component';
import { ApprovalMenuComponent } from './approval-menu/approval-menu.component';
import { FlexModalComponent } from './flex-modal/flex-modal.component';
import { RouterModule } from '@angular/router';
import { NgPipesModule } from 'angular-pipes';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/skipWhile';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeUntil';
import { TranslateModule } from '@ngx-translate/core';

// export { ErrorStatus }    from './ErrorStatus';

export { ApplicationViewInfo } from './ApplicationViewInfoDTO';
export { EmployeeProfileDTO } from './EmployeeProfileDTO';
export { ErrorStatus } from './ErrorStatus';
export { IValidationResponse } from './IValidationResponse';
export { SearchType } from './SearchType';
export { ValidationResponseGenericDTO } from './ValidationResponseGenericDTO'; // dbg decouple

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
  ],
  declarations: [
    FlexModalComponent,
    MqIfDirective,
    ObjectFilter,
    ObjectSum,
    AppLandingComponent,
    ApprovalMenuComponent,
  ],
  entryComponents: [
    FlexModalComponent,
  ],
  exports: [
    MqIfDirective,
    ObjectFilter,
    ObjectSum,
    ApprovalMenuComponent,
    NgPipesModule,
  ]
})
export class SharedModule {

  static injector: Injector;

  constructor(private injector: Injector) {
    SharedModule.injector = injector;
  }

}

