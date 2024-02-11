import React from 'react'
import Dialog from './styled/Dialog';
import FlexStack from './styled/FlexStack';
import Button from './styled/Button';
import { hideConfirmationDialog } from '../store/reducers/confirmation_dialog_reducer';

interface ConfirmationDialogProps {
    message: string;
    onCancel: (...args: any[]) => void;
    onConfirm: (...args: any[]) => void;
};

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ message, onCancel, onConfirm }) => {
  return (
    <Dialog onClose={hideConfirmationDialog}>
        <FlexStack 
            align={'center'} 
            justify={'center'} 
            spacing={30} 
            direction={'column'}
        >
            <div>{message}</div>
            <FlexStack 
                align={'center'} 
                justify={'center'} 
                spacing={10} 
                direction={'row'}
            >
                <Button variant='fullsize' onClick={onCancel}>Cancel</Button>
                <Button variant='fullsize' onClick={() => {onConfirm(); onCancel();}} priority='danger'>Confirm</Button>
            </FlexStack>
        </FlexStack>
    </Dialog>
  );
};

export default ConfirmationDialog;