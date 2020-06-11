import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { TraineeComponent } from './pages';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Typography component="span">
        <CssBaseline>
          <TraineeComponent />
        </CssBaseline>
      </Typography>
    </ThemeProvider>
  );
}

export default App;
