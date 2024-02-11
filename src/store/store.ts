import { configureStore } from "@reduxjs/toolkit";
import markDialogReducer from "./reducers/mark_dialog_reducer";
import markReducer from "./reducers/mark_reducer";
import averageReducer from "./reducers/average_reducer";
import confirmationDialogReducer from "./reducers/confirmation_dialog_reducer";

export const store = configureStore({
  reducer: {
    markDialog: markDialogReducer,
    confimationDialog: confirmationDialogReducer,
    mark: markReducer,
    average: averageReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch