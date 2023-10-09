import { useState } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material';
import { LocaleSelector } from './components/LocaleSelector';
import { PaymentForm } from './components/PaymentForm';

const App = () => {
  const [locale, setLocale] = useState<'lt' | 'en'>('en');

  return (
    <Container
      container
      justifyContent="center"
      alignContent="center"
    >
      <Grid
        container
        gap="2rem"
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <LocaleSelector
          locale={locale}
          onSelect={setLocale}
        />
        <Paper
          elevation={1}
          style={{ padding: '1rem 3rem' }}
        >
          <Typography
            variant="h5"
            textAlign="center"
            marginBottom="2rem"
          >
            Send Money
          </Typography>
          <PaymentForm locale={locale} />
        </Paper>
      </Grid>
    </Container>
  );
};

const Container = styled(Grid)`
  width: 100vw;
  height: 100vh;
`;

export default App;
