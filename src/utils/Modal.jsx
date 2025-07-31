import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledDialog = styled(Dialog)`
  & .MuiDialog-paper {
    min-width: 500px;
    max-width: 600px;
  }
`;

const Modal = ({ 
  open, 
  onClose, 
  title, 
  children, 
  onSave, 
  onCancel,
  onBack,
  saveText = "Guardar",
  cancelText = "Cancelar",
  backText = "Atrás",
  loading = false,
  maxWidth = "md",
  fullWidth = true
}) => {
  return (
    <StyledDialog 
      open={open} 
      onClose={onClose} 
      maxWidth={maxWidth} 
      fullWidth={fullWidth}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel || onClose} color="secondary">
          {cancelText}
        </Button>
        <Button onClick={onSave} color="primary" disabled={loading}>
          {loading ? 'Guardando...' : saveText}
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default Modal; 