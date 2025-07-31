import { styled } from '@mui/material/styles';
import { Button, Box, TextField, Select, Table, Fab } from '@mui/material';

export const Container = styled(Box)`
  padding: 16px;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
`;

export const Input = styled(TextField)`
  margin-bottom: 16px;
  width: 100%;
`;

export const FilterSelect = styled(Select)`
  margin-bottom: 16px;
  width: 100%;
`;

export const TableStyled = styled(Table)`
  width: 100%;
  margin-top: 16px;
`;

export const ButtonStyled = styled(Button)`
  padding: 8px 16px;
  margin-top: 16px;
  &:disabled {
    opacity: 0.5;
  }
`;

export const ButtonContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

export const FloatingAddButton = styled(Fab)`
  position: fixed;
  bottom: 24px;
  right: 24px;
  background-color: #4caf50;
  color: white;
  &:hover {
    background-color: #45a049;
  }
`;