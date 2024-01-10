import { ThemeProvider, createTheme } from '@mui/material'
import './App.css'
import AppRouter from './routes/AppRouter'
import { blueGrey, green, grey, lightBlue, cyan, purple } from '@mui/material/colors';

function App() {
  const theme = createTheme({
    palette: {

      mode: 'dark',
      background: { default: grey[400], paper: grey[600] },
      primary: grey,
      secondary: blueGrey,
      text: {
        primary: grey[50],
        secondary: grey[200],
      },
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <div className='bg-slate-800'>
        <AppRouter />
      </div>
    </ThemeProvider>
  )
}

export default App
