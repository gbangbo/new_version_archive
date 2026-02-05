import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

// Validateur de politique de mot de passe
export function passwordPolicyValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value || control.value.trim() === '') {
            return null;
        }

        const value = control.value;
        const errors: any = {};

        if (value.length < 8) errors.minLength = true;
        if (!/[A-Z]/.test(value)) errors.uppercase = true;
        if (!/[a-z]/.test(value)) errors.lowercase = true;
        if (!/[0-9]/.test(value)) errors.number = true;
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) errors.special = true;

        return Object.keys(errors).length > 0 ? errors : null;
    };
}

// ✅ Validateur de confirmation de mot de passe
export function passwordMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
        const password = formGroup.get('password');
        const confirmPassword = formGroup.get('confirmPassword');

        if (!password || !confirmPassword) {
            return null;
        }

        // Si le mot de passe est vide, pas d'erreur de correspondance
        if (!password.value || password.value.trim() === '') {
            return null;
        }

        // Si confirmation vide, pas encore d'erreur
        if (!confirmPassword.value) {
            return null;
        }

        // Vérifier la correspondance
        if (password.value !== confirmPassword.value) {
            confirmPassword.setErrors({ passwordMismatch: true });
            return { passwordMismatch: true };
        } else {
            // Si les mots de passe correspondent, enlever l'erreur de mismatch
            const errors = confirmPassword.errors;
            if (errors) {
                delete errors['passwordMismatch'];
                confirmPassword.setErrors(Object.keys(errors).length > 0 ? errors : null);
            }
        }

        return null;
    };
}