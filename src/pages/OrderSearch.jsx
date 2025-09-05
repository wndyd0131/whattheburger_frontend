import { AppBar, Box, Button, createTheme, Tab, Tabs, TextField, ThemeProvider } from '@mui/material';
import { orange } from '@mui/material/colors';
import React, { useState } from 'react'
import api from '../utils/api';
import { fetchOrderByEmailAndOrderNumber } from '../api/order';

const theme = createTheme({
  palette: {
    primary: { main: '#FE7800'},
    background: {
      paper: '#fff'
    },
    text: {
      primary: '#173A5E',
      secondary: '#46515A'
    },
    action: {
      active: '#001E3C',
    },
    indicator: {
      orange: '#FE7800'
    }
  },
});

const OrderSearch = () => {

  const [memberFormData, setMemberFormData] = useState({
    email: '',
    password: ''
  });

  const [guestFormData, setGuestFormData] = useState({
    email: '',
    orderNumber: ''
  });

  const handleClickSearchButton = () => {
    const email = guestFormData.email;
    const orderNumber = guestFormData.orderNumber;

    fetchOrderByEmailAndOrderNumber(email, orderNumber)
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }
  
  const [tab, setTab] = useState(0);
  return (
    <div className="flex justify-center items-center h-screen">
     <ThemeProvider theme={theme}>
        <Box         sx={{
          bgcolor: 'background.paper',
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 400,
        }}>
          <Tabs
            sx={{
              "& .MuiTab-root.Mui-selected": { color: "#FE7800" }
            }}
            slotProps={{
              indicator: {
                style: {
                  backgroundColor: "primary",
                }}
              }}
            value={tab}
            onChange={(_, v) => setTab(v)}
          >
            <Tab label="Member"></Tab>
            <Tab label="Guest"></Tab>
          </Tabs>
          {tab === 0 &&
            <Box mt={2} gap={2} className="flex flex-col">
              <TextField label="email"></TextField>
              <TextField label="password"></TextField>
              <Button>Sign In</Button>
            </Box>
          }
          {tab === 1 &&
            <Box mt={2} gap={2} className="flex flex-col">
              <TextField label="email"></TextField>
              <TextField label="orderNumber"></TextField>
              <Button onClick={() => handleClickSearchButton()} color='primary'>Search</Button>
            </Box>
          }
        </Box>
        </ThemeProvider>
    </div>
  )
}

export default OrderSearch;