import { FormField } from '@md-starwars/shared/ui-forms';

const row = (fieldGroup: FormField[]) => FormField.fieldRow(fieldGroup, 'grid grid-cols-1');
const fieldClass = 'col-span-1';

export const loginForm = () => [
  row([FormField.email('email', { label: 'LOGIN.FIELDS.EMAIL', required: true }, { className: fieldClass })]),
  row([FormField.password('password', { label: 'LOGIN.FIELDS.PASSWORD', required: true }, { className: fieldClass })]),
];
