import { CommonDataService } from '../common-data/common-data.service';
import { SharedModule } from '../shared.module';

export function ngRegisterComponent(): ClassDecorator {
  return function ( constructor: any ) {
    const component = constructor.name;

    const ngOnInitOriginal = constructor.prototype.ngOnInit;

    constructor.prototype.ngOnInit = function (...args) {

      if (ngOnInitOriginal) {
        ngOnInitOriginal.apply(this, args);
      } // Append to existing hook if we have one

      // Grab the common data service
      const commonDataService = SharedModule.injector.get(CommonDataService);
      commonDataService.registerComponentCreation(this);

    }; // end new ngOnInit

  }; // end function
} // end NgRegisterComponent
