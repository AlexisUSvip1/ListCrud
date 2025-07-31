import { styled } from '@mui/material/styles';
import { Button, TextField, Box, Typography, Select, Paper } from '@mui/material';

export const Container = styled(Box)`
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

export const FormCard = styled(Paper)`
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

export const InputField = styled(TextField)`
  margin-bottom: 16px;
  & .MuiOutlinedInput-root {
    border-radius: 8px;
  }
`;

export const StatusSelect = styled(Select)`
  margin-bottom: 16px;
  width: 100%;
  & .MuiOutlinedInput-root {
    border-radius: 8px;
  }
`;

export const SubmitButton = styled(Button)`
  padding: 12px 24px;
  background-color: #4caf50;
  color: white;
  border-radius: 50px;
  font-weight: 600;
  &:disabled {
    opacity: 0.5;
  }
  &:hover {
    background-color: #45a049;
  }
`;

export const ErrorText = styled(Typography)`
  color: #f44336;
  margin-top: 16px;
  text-align: center;
  font-weight: 500;
`;

export const LocationContainer = styled(Box)`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

export const LocationField = styled(TextField)`
  flex: 1;
  & .MuiOutlinedInput-root {
    border-radius: 8px;
  }
`;

export const SwitchContainer = styled(Box)`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;