import { styled } from '@mui/material/styles';
import { Button, Box, Typography, Paper, Select } from '@mui/material';

// Aquí estilizamos el select para el estado
export const SelectStatus = styled(Select)`
  width: 100%;
  padding: 8px;
  border-radius: 12px;
  background-color: #f0f0f0;
`;

export const Container = styled(Box)`
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

export const DetailCard = styled(Paper)`
  padding: 24px;
  width: 100%;
  max-width: 600px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

export const Title = styled(Typography)`
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 24px;
`;

export const InfoText = styled(Typography)`
  margin-bottom: 12px;
  font-size: 16px;
  line-height: 1.5;
`;

export const ButtonContainer = styled(Box)`
  display: flex;
  justify-content: space-around;
  margin-top: 24px;
`;

export const StatusButton = styled(Button)`
  padding: 8px 16px;
  background-color: #2196f3;
  color: white;
  border-radius: 50px;
  &:disabled {
    opacity: 0.5;
  }
`;

export const DeleteButton = styled(Button)`
  padding: 8px 16px;
  background-color: #f44336;
  color: white;
  border-radius: 50px;
  &:disabled {
    opacity: 0.5;
  }
`;

export const EditButton = styled(Button)`
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border-radius: 50px;
  &:disabled {
    opacity: 0.5;
  }
`;