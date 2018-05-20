import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CommonValidators {
    static cannotBeNull(control : AbstractControl) : ValidationErrors | null {
        if((control.value as string) !== '')
            return {cannotContainSpace : true};
        return null;
    }

    static clientName(control : AbstractControl) : ValidationErrors | null {
        if ((control.value as string) === '' || control.value === null)
            return {cannotContainSpace : true};
        else if((control.value as string).length >= 3 && (control.value as string).length <= 30)
            return {cannotContainSpace : true};
        return null;
    }

}
