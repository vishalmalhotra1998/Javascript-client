import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import theme from './theme';
import Trainee from './pages/Trainee/Trainee';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Typography><Trainee /></Typography>
    </ThemeProvider>
  );
}

export default App;
