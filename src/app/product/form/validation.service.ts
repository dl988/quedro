import { isNumeric } from 'rxjs/util/isNumeric';
import { FormGroup } from '@angular/forms';

export class ValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any){
    let config = {
      'required': 'Required',
      'validateZipcode': 'Must be 5 characters exactly',
      'validateIsNumber': 'Must be number',
      'validateType': 'The field of price is required',
      'validatePrice': 'The field of residence type is required',
      'minlength': `Minimum length ${validatorValue.requiredLength}`
    };

    return config[validatorName];
  }

  static validateZipcode(control) {
    return control.value.length === 5  ? null : {
      validateZipcode: {
        valid: false
      }
    };
  }

  static validateIsNumber (control) {
    return isNumeric(control.value) ? null : {
      validateIsNumber: {
        valid: false
      }
    };
  }

  static validateType (g: FormGroup) {
    if (!g.parent) return;
    
    if (!g.parent.get('price').value) {
      return {
          validateType: {
            valid: false
          }
        };
    } else {
      return null;
    }
  }

  static validatePrice (g: FormGroup) {
    if (!g.parent) return;
    
    if (!g.parent.get('type').value) {
      return {
          validatePrice: {
            valid: false
          }
        };
    } else {
      return null;
    }
  }
}