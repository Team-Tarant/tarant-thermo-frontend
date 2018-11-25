import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: { main: '#1D3557' }, // Purple and green play nicely together.
    secondary: { main: '#A8DADC' }, // This is just green.A700 as hex.
    type: 'light',
  },
  typography: {
    useNextVariants: true,
  },
});
