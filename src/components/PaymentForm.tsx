import { Button, Grid, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormikTextField, AccountSelectionField, LocalizedNumberField } from '../components/form-fields';
import { PayerAccounts } from '../constants';
import { Locale, OpenIbanResponse } from '../types';

const PaymentValidationSchema = Yup.object<{
  amount: string;
  payerAccount: string;
  payeeAccount: string;
  purpose: string;
  payee: string;
}>().shape({
  amount: Yup.number()
    .test('validateAmount', 'Amount exceeds balance', function (amount) {
      // Deep Yup typing issue - not worth fixing for the task
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const payerAccountId = this.options.parent.payerAccount as string;
      const payerAccount = PayerAccounts.find(({ id }) => id === payerAccountId);
      if (!amount || !payerAccount) return true;

      return payerAccount && amount < payerAccount.balance;
    })
    .min(0.01, 'Amount should be at least 0.01')
    .required('Amount is required'),
  payeeAccount: Yup.string()
    .test('validateIban', 'Invalid Account Number', (value) =>
      fetch(`https://openiban.com/validate/${value}?validateBankCode=true&getBIC=true`).then(async (res) => {
        const response = (await res.json()) as OpenIbanResponse;

        return response.valid;
      }),
    )
    .required('Payee account is required'),
  purpose: Yup.string()
    .min(3, 'Purpose should be at least 3 characters length')
    .max(135, 'Purpose should be at most 135 characters length'),
  payee: Yup.string().max(70, 'Payee should be at most 70 characters length'),
});

const initialValues = {
  amount: 0,
  payeeAccount: '',
  payerAccount: '',
  purpose: '',
  payee: '',
};

export const PaymentForm = ({ locale }: { locale: Locale }) => {
  return (
    <Formik
      initialValues={initialValues}
      validateOnChange
      validationSchema={PaymentValidationSchema}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ isSubmitting, isValid, values }) => {
        const selectedAccount = PayerAccounts.find(({ id }) => id === values.payerAccount);

        return (
          <Form>
            <Grid
              container
              direction="column"
              justifyItems={'flex-start'}
              gap="1rem"
              width="20rem"
            >
              <LocalizedNumberField
                name="amount"
                label="Amount"
                locale={locale}
              />
              <FormikTextField
                name="payeeAccount"
                label="Payee Account"
                type="text"
                placeholder="LT307300010172619164"
              />
              <AccountSelectionField
                name="payerAccount"
                label="Payer Account"
                locale={locale}
                options={PayerAccounts}
              />
              {selectedAccount && (
                <Typography
                  alignSelf="flex-end"
                  position="relative"
                  top="-0.5rem"
                  variant="caption"
                >{`Remaining: ${Intl.NumberFormat(locale).format(
                  selectedAccount?.balance - values.amount,
                )}`}</Typography>
              )}
              <FormikTextField
                name="payee"
                label="Payee"
                type="text"
              />
              <FormikTextField
                name="purpose"
                multiline
                rows={3}
                label="Purpose"
                type="text"
              />
              <Button
                type="submit"
                variant="contained"
                size="small"
                disabled={isSubmitting || !isValid}
                style={{
                  height: '2rem',
                  width: '5rem',
                  borderRadius: '2rem',
                  alignSelf: 'center',
                }}
              >
                Send
              </Button>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};
