import { TextFieldProps } from '@mui/material';
import { useField } from 'formik';
import { FormikTextField } from '.';
import { NumericFormat } from 'react-number-format';
import { Locale } from '../../types';

type FormikNumberField = {
  label: string;
  name: string;
  locale: Locale;
} & TextFieldProps;

export const LocalizedNumberField = (props: FormikNumberField) => {
  const [field, , actions] = useField(props.name);

  return (
    <NumericFormat
      value={field.value}
      decimalSeparator={props.locale === 'lt' ? ',' : '.'}
      thousandSeparator={props.locale === 'lt' ? '.' : ','}
      customInput={FormikTextField}
      onValueChange={({ value }) => {
        actions.setTouched(true);
        actions.setValue(value);
      }}
      label={props.label}
      name={props.name}
    />
  );
};
