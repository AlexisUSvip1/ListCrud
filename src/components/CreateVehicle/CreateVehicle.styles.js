import { styled } from '@mui/material/styles';
import { Button, TextField, Box, Typography, Select } from '@mui/material';

export const Container = styled(Box)`
  padding: 16px;
  max-width: 600px;
  margin: 0 auto;
`;

export const Title = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

export const InputField = styled(TextField)`
  margin-bottom: 16px;
`;

export const StatusSelect = styled(Select)`
  margin-bottom: 16px;
  width: 100%;
`;

export const SubmitButton = styled(Button)`
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  &:disabled {
    opacity: 0.5;
  }
`;

export const ErrorText = styled(Typography)`
  color: red;
  margin-top: 16px;
`;

export const LocationContainer = styled(Box)`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

export const LocationField = styled(TextField)`
  flex: 1;
`;

export const SwitchContainer = styled(Box)`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
`;