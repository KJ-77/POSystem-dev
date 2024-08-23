import '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
declare module '@mui/material/styles' {
  interface Palette {
    third: Palette['primary'];
    fourth: Palette['primary'];
    fifth: Palette['primary'];
  }

  interface PaletteOptions {
    third?: PaletteOptions['primary'];
    fourth?: PaletteOptions['primary'];
    fifth?: PaletteOptions['primary'];
  }
}


const theme = createTheme({
  palette: {
    primary: {
      main: '#fbfaf6',
    },
    secondary: {
      main: '#d2be8b',
    },
    third: {
      main: '#009292',

    },
    fourth: {
      main: '#005858',
    },
    fifth: {
      main: '#002a2f',
    },
  },

});

export default theme;