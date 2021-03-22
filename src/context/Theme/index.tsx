import { createMuiTheme } from '@material-ui/core/styles';
import { blueGrey, blue } from '@material-ui/core/colors';

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    test: PaletteColorOptions
  }
  interface PaletteOptions {
    test?: PaletteColorOptions
  }
}

export default createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[700],
    },
    secondary: {
      main: blue[900],
    },
    test: {
      main: '#006647',
    },
    tonalOffset: 0.2,
  }
});
