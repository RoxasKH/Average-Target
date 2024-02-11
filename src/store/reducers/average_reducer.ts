import { createAction, createSlice, isAnyOf } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { AppDispatch, RootState } from '../store'
import WebWorker from 'react-web-workers';
import averageWorker from '../../worker/average_worker';

interface AverageState {
  result: number[][] | null;
  error: string;
  loading: boolean
}

const initialState: AverageState = {
  result: null,
  error: '',
  loading: false
};

export const averageSlice = createSlice({
  name: 'average',
  initialState: initialState,
  reducers: {
    setResult: (state, action: PayloadAction<number[][]>) => {
        state.result = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
        state.error = action.payload;
    },
    clearError: (state) => {
        state.error = '';
    },
    setLoading: (state) => {
        state.loading = true
    },
    stopLoading: (state) => {
        state.loading = false
    }
  },
});

export const calculate = (
    marks: number[],
    maximum_mark: number,
    minimum_mark: number,
    missing_marks: number,
    average_target: number
) => async (dispatch: AppDispatch) => {

  dispatch(setLoading());
  dispatch(clearError());

  if(marks.length === 0) {
    dispatch(setError('Sorry, you need to add some marks first.'));
    return;
  }

  for (const mark of marks) {
    if(mark > maximum_mark || mark < minimum_mark) {
      dispatch(setError('Some marks are out of the possible range set.'));
      return;
    }
  }

  const [worker] = WebWorker([averageWorker]);

  const handleMessage: (worker: Worker) => Promise<number[][]> = (worker) => {
    return new Promise((resolve, reject) => {
      worker.onmessage = (event) => {
        resolve(event.data);
      };
      worker.onerror = (error) => {
        reject(error);
      };
    });
  };

  worker.postMessage({
    marks: marks,
    maximum_mark: maximum_mark,
    minimum_mark: minimum_mark,
    missing_marks: missing_marks,
    average_target: average_target
  });

  const result: number[][] = await handleMessage(worker);

  if(result.length === 0) {
    dispatch(setError('Sorry, but there is no way you can get your target average.'));
    return;
  }

  dispatch(setResult(result));
  dispatch(stopLoading());

}

export const { setResult, setError, clearError, setLoading, stopLoading } = averageSlice.actions;

export default averageSlice.reducer;
