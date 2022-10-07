import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { useNavigate } from "react-router-dom";

export const NewWordButton = () => {
  const navigate = useNavigate();
  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{position: 'fixed', bottom: 16, right: 16}}
      icon={<SpeedDialIcon/>}
      onOpen={() => navigate('/new-word')}
    />
  );
}