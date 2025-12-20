import { FormlyExtension, FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import { noop } from 'rxjs';

export class TranslateExtension implements FormlyExtension {
  constructor(private translate: TranslateService) {}
  prePopulate(field: FormlyFieldConfig) {
    const to = field.templateOptions || {};
    if (!to.translate || to._translated) {
      return;
    }

    to._translated = true;
    field.expressionProperties = {
      ...(field.expressionProperties || {}),
      'templateOptions.label': this.translate.stream(to.label),
      // 'templateOptions.placeholder': this.translate.stream(to.placeholder),
    };
  }
}

export class TranslatePlaceholderExtension implements FormlyExtension {
  constructor(private translate: TranslateService) {}
  prePopulate(field: FormlyFieldConfig) {
    const to = field.templateOptions || {};
    if (!to.translatePlaceholder || to._translatePlaceholder) {
      return;
    }

    to._translatePlaceholder = true;
    field.expressionProperties = {
      ...(field.expressionProperties || {}),
      'templateOptions.placeholder': this.translate.stream(to.placeholder),
    };
  }
}

export function registerTranslateExtension(translate: TranslateService) {
  return {
    validationMessages: [
      {
        name: 'required',
        message() {
          return translate.stream('FORM_LABEL.VALIDATION.REQUIRED');
        },
      },
    ],
    extensions: [
      {
        name: 'translate',
        extension: new TranslateExtension(translate),
      },
      {
        name: 'translatePlaceholder',
        extension: new TranslatePlaceholderExtension(translate),
      },
    ],
  };
}
