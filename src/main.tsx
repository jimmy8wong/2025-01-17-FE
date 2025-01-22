import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            <a href="/">My Awesome Admin Panel</a>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>

    <div id="container">
      <App />
    </div>
  </StrictMode>,
)
