import { createTheme, responsiveFontSizes } from '@mui/material';

const theme = responsiveFontSizes(
  createTheme({
    spacing: 4,
    palette: {
      background: {
        default: '#1e1e1e', // green
      },
      primary: {
        main: '#9c3dc1', // purple
      },
      secondary: {
        main: '#dadada', // white
      },
      error: {
        main: '#D72A2A', // red
      },
      warning: {
        main: '#FC7B09', // orange
      },
      info: {
        main: '#6B7D6A', // gray
      },
      success: {
        main: '#09FE00', // green
      },
      text: {
        primary: '#000000', // black
        secondary: '#FFFFFF', // white
      },
    },
  }),
);

export default theme;
