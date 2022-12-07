import './App.css';

import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Drawer from './components/Drawer';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Transaction from './components/Transaction';
import Product from './components/Product';
import Profile from './components/Profile';

import axios from '../src/config/axisConfig';

function App() {
  // state - global merchant details  
  const [merchantId, setMerchantId] = useState();
  const [merchantPk, setMerchantPk] = useState();

  // state - controling global menu navigation 
  const [selectedMenu, setSelectedMenu] = useState(0);
  // state - controling global backdrop 
  const [backdrop, setBackdrop] = useState(true);
  // state - controling global alert 
  const [alert, setAlert] = useState(false);

  // state - chart data
  const [chartData, setChartData] = useState([]);

  // state for login dialog 
  const [input, setInput] = useState();
  const [loginDialogOpen, setLoginDialogOpen] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    showBackdrop(true);
    axios.get(`/provider/${input}/`)
      .then(function (response) {
        setMerchantId(response.data.merchant_network_id);
        setMerchantPk(response.data.id);
        setChartData(response.data.chart_data);
        setLoginDialogOpen(false);
        showBackdrop(false);
        showAlert();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInput(value);
  }

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
        {merchantId && <Drawer showAlert={showAlert} selectedMenu={selectedMenu} showBackdrop={showBackdrop} setSelectedMenu={setSelectedMenu} />}
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
          {merchantId && selectedMenu === 0 && <Transaction merchantId={merchantId} chartData={chartData} showBackdrop={showBackdrop} showAlert={showAlert} />}
          {merchantId && selectedMenu === 1 && <Product merchantId={merchantId} merchantPk={merchantPk} showBackdrop={showBackdrop} showAlert={showAlert} />}
          {merchantId && selectedMenu === 2 && <Profile merchantId={merchantId} showBackdrop={showBackdrop} showAlert={showAlert} />}
        </Box>
      </Box>
      <Dialog
        open={loginDialogOpen}
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle id="responsive-dialog-title">
            Login
          </DialogTitle>
          <DialogContent>
            <Box component="span" sx={{
              '& .MuiTextField-root': { m: 1, width: '28ch' },
            }}>
              <div>
                <TextField
                  onChange={handleInputChange}
                  value={input}
                  name="MerchantId"
                  label="Merchant Id"
                  required={true} helperText="" />
              </div>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              value="Submit"
              autoFocus={true}
              style={{ 'color': '#646464', 'borderColor': '#646464', 'backgroundColor': 'transparent' }}
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>

  );
}

export default App;
