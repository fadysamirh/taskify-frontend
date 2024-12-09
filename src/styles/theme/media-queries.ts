import { Theme } from '@mui/material';

export const mediaQueries = {
  small: (theme: Theme) => theme.breakpoints.down('lg'),
  desktop: (theme: Theme) => theme.breakpoints.up('lg'),
  mobile: (theme: Theme) => theme.breakpoints.down('sm'),
};
