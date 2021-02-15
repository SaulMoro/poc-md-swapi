import { FormField } from '@md-starwars/shared/ui-forms';

const row = (fieldGroup: FormField[]) => FormField.fieldRow(fieldGroup, 'grid grid-cols-1');
const fieldClass = 'col-span-1';

export const signInForm = () => [
  row([FormField.input('name', { label: 'SIGN_IN.FIELDS.NAME', required: true }, { className: fieldClass })]),
  row([FormField.email('email', { label: 'SIGN_IN.FIELDS.EMAIL', required: true }, { className: fieldClass })]),
  row([
    FormField.password('password', { label: 'SIGN_IN.FIELDS.PASSWORD', required: true }, { className: fieldClass }),
  ]),
  row([
    FormField.checkbox('company', { label: 'SIGN_IN.FIELDS.COMPANY', indeterminate: false }, { className: fieldClass }),
  ]),
  row([
    FormField.checkbox(
      'legal',
      { label: 'SIGN_IN.FIELDS.LEGAL', required: true, indeterminate: false },
      { className: fieldClass },
    ),
  ]),
  row([
    FormField.checkbox(
      'commercial',
      { label: 'SIGN_IN.FIELDS.COMMERCIAL', indeterminate: false },
      { className: fieldClass },
    ),
  ]),
];
