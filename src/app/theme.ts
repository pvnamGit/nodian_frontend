import { createTheme, responsiveFontSizes } from '@mui/material';

const theme = responsiveFontSizes(
  createTheme({
    spacing: 4,
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      h1: {
        fontSize: '4rem',
        fontFamily: 'Raleway',
      },
      h2: {
        fontSize: '3rem',
        fontFamily: 'Raleway',
        fontStyle: 'bold',
      },
      h3: {
        fontSize: '2rem',
        fontFamily: 'Roboto',
      },
    },
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
