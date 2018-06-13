import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ObjectFilter',
    pure: false,
})
export class ObjectFilter implements PipeTransform {
    transform(value: any, input: any, searchableList: any) {
        // If input is an string filter list on string value.
        if (typeof input === 'string' && input) {
            input = input.toLowerCase();
            return value.filter(function (el: any) {
                let isTrue = false;
                if (searchableList) {
                    for ( const k of Object.keys(searchableList) ) {
                        if (el[searchableList[k]].toString().toLowerCase().indexOf(input) > -1) {
                            isTrue = true;
                        }
                    }
                } else {
                    if (el.toString().toLowerCase().indexOf(input) > -1) {
                        isTrue = true;
                    }
                }
                if (isTrue) {
                    return el;
                }
            });
        } else if ((input instanceof Array) && (input.length > 0)) {
            return value.filter(function (el: any) {
                let isTrue = false;
                for ( const k of Object.keys(searchableList) ) {
                    if (input.length) {
                        input.forEach(inputVal => {
                            if (inputVal) {
                                inputVal = inputVal.toLowerCase();
                                if (el[searchableList[k]].toString().toLowerCase().indexOf(inputVal) > -1) {
                                    isTrue = true;
                                }
                            }
                        });
                        if (isTrue) {
                            return el;
                        }
                    }
                }
            });
        }
        return value;
    }
}
