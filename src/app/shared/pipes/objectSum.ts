import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ObjectSum',
    pure: true,
})
export class ObjectSum implements PipeTransform {
    transform(values: any[], fieldName: string) {
        let returnValue: number = 0;
        values.forEach(value => {
            returnValue += value[fieldName];
        });
        // If input is an string filter list on string value.
        return returnValue;
    }
}
