import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface MarkDialogState {
  show: boolean;
  edit: boolean;
  edit_content: {
    mark: number,
    subject: string,
    id: number
  }
}

const initialState: MarkDialogState = {
  show: false,
  edit: false,
  edit_content: {
    mark: 0,
    subject: '',
    id: 0,
  }
};

const isAddDialogToggled = (
  action: PayloadAction
): action is PayloadAction<any> => action.type.endsWith("/toggleAddDialog");
const isEditDialogToggled = (
  action: PayloadAction
): action is PayloadAction<any> => action.type.endsWith("/toggleEditDialog");
const isDialogToggled = (action: PayloadAction): boolean => isAnyOf(isAddDialogToggled, isEditDialogToggled)(action);


export const markDialogSlice = createSlice({
  name: 'mark_dialog',
  initialState: initialState,
  reducers: {
    toggleMarkDialog: (state) => {
      state.show = !state.show;
    },
    toggleAddDialog: (state) => {
      state.edit = false;
    },
    toggleEditDialog: (state) => {
      state.edit = true;
    },
    setEditInputs: (state, action: PayloadAction<{mark: number, subject: string, id: number}>) => {
      state.edit_content = {
        mark: action.payload.mark,
        subject: action.payload.subject,
        id: action.payload.id
      }
    },
    setEditMark: (state, action: PayloadAction<number>) => {
      state.edit_content.mark = action.payload;
    },
    setEditSubject: (state, action: PayloadAction<string>) => {
      state.edit_content.subject = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isDialogToggled, (state) => {
        markDialogSlice.caseReducers.toggleMarkDialog(state);
      })
      .addDefaultCase((state) => {
        return state;
      });
  },
});

export const { toggleAddDialog, toggleEditDialog, toggleMarkDialog, setEditInputs, setEditMark, setEditSubject } = markDialogSlice.actions;

export default markDialogSlice.reducer;
