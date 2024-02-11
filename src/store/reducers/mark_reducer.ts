import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

let id = 0;

interface MarkState {
  mark: number;
  subject: string;
  id: number;
}

const initialState: MarkState[] = [];

const isMarkadded = (action: PayloadAction) => {
  return action.type.endsWith("/addMark");
};

export const markSlice = createSlice({
  name: 'marks',
  initialState: initialState,
  reducers: {
    addMark: (state, action: PayloadAction<MarkState>) => {
      state.push({
        mark: action.payload.mark,
        subject: action.payload.subject,
        id: id
      }) 
    },
    removeMark: (state, action: PayloadAction<{id: number}>) => {
        return state.filter(mark => mark.id !== action.payload.id);
    },
    editMark: (state, action: PayloadAction<MarkState>) => {
        const updatedArray = state.filter(mark => mark.id !== action.payload.id);
        updatedArray.push({
            mark: action.payload.mark,
            subject: action.payload.subject,
            id: action.payload.id
        });
        return updatedArray;
    },
    clearMarks: (state) => {
        return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isMarkadded, (state) => {
        id++;
      })
      .addDefaultCase((state) => {
        return state;
      });
  },
});

export const { addMark, removeMark, editMark, clearMarks } = markSlice.actions;

export default markSlice.reducer;
