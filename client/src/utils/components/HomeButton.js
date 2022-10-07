import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import HomeIcon from '@mui/icons-material/Home';import { useNavigate } from "react-router-dom";

export const HomeButton = () => {
  const navigate = useNavigate();
  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{position: 'absolute', bottom: 16, left: 16}}
      icon={<HomeIcon/>}
      onOpen={() => navigate('/')}
    />
  );
}