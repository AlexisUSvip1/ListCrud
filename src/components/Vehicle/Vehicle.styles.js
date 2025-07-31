import { styled } from '@mui/material/styles';
import { Button, Box, TextField, Select, Table, Fab } from '@mui/material';

export const Container = styled(Box)`
  padding: 16px;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 8px;
    max-width: 100%;
  }
  
  @media (max-width: 480px) {
    padding: 4px;
  }
`;

export const Input = styled(TextField)`
  margin-bottom: 16px;
  width: 100%;
  
  @media (max-width: 768px) {
    margin-bottom: 12px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 8px;
  }
`;

export const FilterSelect = styled(Select)`
  margin-bottom: 16px;
  width: 100%;
  
  @media (max-width: 768px) {
    margin-bottom: 12px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 8px;
  }
`;

export const TableStyled = styled(Table)`
  width: 100%;
  margin-top: 16px;
  
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 14px;
  }
  
  @media (max-width: 480px) {
    margin-top: 8px;
    font-size: 12px;
  }
`;

export const ButtonStyled = styled(Button)`
  padding: 8px 16px;
  margin-top: 16px;
  &:disabled {
    opacity: 0.5;
  }
  
  @media (max-width: 768px) {
    padding: 10px 20px;
    margin-top: 12px;
    font-size: 14px;
  }
  
  @media (max-width: 480px) {
    padding: 8px 16px;
    margin-top: 8px;
    font-size: 13px;
  }
`;

export const ButtonContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
    margin-top: 12px;
  }
  
  @media (max-width: 480px) {
    gap: 6px;
    margin-top: 8px;
  }
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
  
  @media (max-width: 768px) {
    bottom: 16px;
    right: 16px;
    width: 56px;
    height: 56px;
  }
  
  @media (max-width: 480px) {
    bottom: 12px;
    right: 12px;
    width: 48px;
    height: 48px;
  }
`;