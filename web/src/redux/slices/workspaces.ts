import { createSlice } from '@reduxjs/toolkit';

interface initialStateProps {
  workspaces: {
    type: 'PERSONAL' | 'PUBLIC';
    name: string;
    id: string;
  }[];
}

const initialState: initialStateProps = {
  workspaces: [],
};

export const workspacesSlice = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {
    setWorkspaces: (state, action) => {
      return {
        ...state,
        workspaces: action.payload.workspaces,
      };
    },
    addWorkspace: (state, action) => {
      state.workspaces.push(action.payload);
    },
    removeWorkspace: (state, action) => {
      state.workspaces = state.workspaces.filter(
        (workspace) => workspace.id !== action.payload
      );
    },
  },
});

export const { setWorkspaces, addWorkspace, removeWorkspace } =
  workspacesSlice.actions;
export default workspacesSlice.reducer;
