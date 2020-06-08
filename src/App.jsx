import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import theme from './theme';
import { ChildrenDemo } from './pages';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Typography component="span"><ChildrenDemo /></Typography>
    </ThemeProvider>
  );
}

export default App;
