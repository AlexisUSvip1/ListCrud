import React from 'react';
import { Box, Typography } from '@mui/material';
import { WarningRounded } from '@mui/icons-material';

const NoData = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: 2 }}>
      <WarningRounded sx={{ fontSize: 50, color: '#f44336' }} />
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        No hay información
      </Typography>
    </Box>
  );
};

export default NoData;