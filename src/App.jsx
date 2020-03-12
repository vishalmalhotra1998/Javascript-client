import React from 'react';
// import TextEditor from './pages/index';
// import InputDemo from './pages/InputDemo/InputDemo';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import theme from './theme';
import { ChildrenDemo } from './pages/index';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Typography><ChildrenDemo /></Typography>
    </ThemeProvider>
  );
}

export default App;
