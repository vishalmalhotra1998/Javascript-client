import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { TraineeComponent } from './pages';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Typography component="span">
        <TraineeComponent />
      </Typography>
    </ThemeProvider>
  );
}

export default App;
