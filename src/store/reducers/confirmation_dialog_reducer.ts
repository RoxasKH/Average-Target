import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface ConfirmationDialogData {
    message: string;
    onCancel: ((...args: any[]) => any) | null;
    onConfirm: ((...args: any[]) => any) | null;
}

interface ConfirmationDialogState extends ConfirmationDialogData {
  show: boolean;
}

const initialState: ConfirmationDialogState = {
  show: false,
  message: '',
  onCancel: () => {},
  onConfirm: () => {},
};

export const confirmationDialogSlice = createSlice({
  name: 'confirmation_dialog',
  initialState: initialState,
  reducers: {
    showConfirmationDialog: (state, action: PayloadAction<ConfirmationDialogData>) => {
        state.show = true;
        state.message = action.payload.message;
        state.onCancel = action.payload.onCancel;
        state.onConfirm = action.payload.onConfirm;
    },
    hideConfirmationDialog: (state) => {
        return initialState;
    }
  },
});

export const { showConfirmationDialog, hideConfirmationDialog } = confirmationDialogSlice.actions;

export default confirmationDialogSlice.reducer;
