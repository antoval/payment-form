import { TextField, TextFieldProps } from '@mui/material';
import { useField } from 'formik';

type FormikTextField = {
  label: string;
  name: string;
} & TextFieldProps;

export const FormikTextField = (props: FormikTextField) => {
  const [field, meta] = useField(props.name);

  return (
    <TextField
      value={field.value}
      size="small"
      onChange={field.onChange}
      onBlur={field.onBlur}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      InputLabelProps={{ shrink: true }}
      {...props}
    />
  );
};
