import './App.css';

import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Box from '@mui/material/Box';
import Drawer from './components/Drawer';
import Transaction from './components/Transaction';
import Product from './components/Product';
import Profile from './components/Profile';

function App() {
  // state for controling global menu navigation 
  const [selectedMenu, setSelectedMenu] = useState(2);
  // state for controling global backdrop 
  const [backdrop, setBackdrop] = useState(true);
  // state for controling global alert 
  const [alert, setAlert] = useState(false);

  const showBackdrop = (value) => {
    setBackdrop(value);
  };

  const showAlert = () => {
    setAlert(true);
  };

  return (
    <div className="App">
      <Box sx={{ display: 'flex' }}>
        {/* <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>

          </Toolbar>
        </AppBar> */}
        <Drawer showAlert={showAlert} selectedMenu={selectedMenu} showBackdrop={showBackdrop} setSelectedMenu={setSelectedMenu} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={backdrop}
            invisible={false}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          {selectedMenu === 0 && <Transaction showBackdrop={showBackdrop} showAlert={showAlert} />}
          {selectedMenu === 1 && <Product showBackdrop={showBackdrop} showAlert={showAlert} />}
          {selectedMenu === 2 && <Profile showBackdrop={showBackdrop} showAlert={showAlert} />}
        </Box>
      </Box>
    </div>
  );
}

export default App;
