import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('password')?.value;
        const confirmPassword = control.get('confirmPassword')?.value;

        if (password !== confirmPassword) {
            return { passwordMismatch: true };
        } else {
            return null;
        }
    };
}

export function emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!control.value || emailPattern.test(control.value)) {
            return null;
        } else {
            return { 'invalidEmail': true };
        }
    }
};
