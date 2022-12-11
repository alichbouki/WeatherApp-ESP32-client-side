import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';

const theme = createTheme({
  components:{
    MuiTextField:{
      defaultProps:{
        margin:"dense"
      }
    }
  },

  typography:{
    fontSize: 14,
    htmlFontSize: 16,
    h1: {
      fontSize: "3.5rem"
    },
    h2: {
      fontSize: "3rem"
    },
    h3: {
      fontSize: "2.5rem"
    },
    h4: {
      fontSize: "2rem"
    },
    h5: {
      fontSize: "1.5rem"
    },
    h6: {
      fontSize: "1rem",
      color: "black"
    }
  },

  palette: {
    primary: {
      main: "#0d47a1",
      dark: "#002171",
      light: "#5472d3"
    },

    secondary: {
      main: "#25a59a",
      dark: "#00756c",
      light: "#63d7cb"
    },

    success: {
      main: "#43a047",
      dark: "#00701a",
      light: "#76d275"
    },
    
    error: {
      main: "#d50000",
      dark: "#9b0000",
      light: "#ff5131"
    },

    warning: {
      main: "#ff9800",
      dark: "#c66900",
      light: "#ffc947"
    },

    info: {
      main: "#bbdefb",
      dark: "#8aacc8",
      light: "#eeffff"
    },
    
  }
});

const Theme = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
