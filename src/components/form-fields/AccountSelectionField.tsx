import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { FieldConfig, useField } from 'formik';
import { Locale } from '../../types';

interface AccountSelectionProps extends FieldConfig {
  label: string;
  locale: Locale;
  options: {
    id: string;
    iban: string;
    balance: number;
  }[];
}

export const AccountSelectionField = (props: AccountSelectionProps) => {
  const [field, meta] = useField(props.name);

  return (
    <FormControl>
      <InputLabel size="small">{props.label}</InputLabel>
      <Select
        {...props}
        size="small"
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        error={meta.touched && Boolean(meta.error)}
        label={props.label}
      >
        {props.options.map(({ iban, id, balance }) => {
          return (
            <MenuItem
              key={id}
              value={id}
              dense
            >
              <Grid
                container
                justifyContent="space-between"
              >
                <span>{iban}</span> <span>{new Intl.NumberFormat(props.locale).format(balance)}</span>
              </Grid>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
