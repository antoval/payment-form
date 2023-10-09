import { Grid, Chip, Typography } from '@mui/material';
import { Locale } from '../types';

interface LocaleSelector {
  locale: Locale;
  onSelect: (locale: Locale) => void;
}

export const LocaleSelector = (props: LocaleSelector) => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      gap="0.5rem"
    >
      <Typography>Number locale: </Typography>
      <Grid>
        {['en', 'lt'].map((locale) => (
          <Chip
            key={locale}
            style={{ width: '3rem' }}
            label={locale.toUpperCase()}
            onClick={() => props.onSelect(locale as Locale)}
            variant={locale === props.locale ? 'filled' : 'outlined'}
          />
        ))}
      </Grid>
    </Grid>
  );
};
