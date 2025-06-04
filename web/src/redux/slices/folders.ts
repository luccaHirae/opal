import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface initialStateProps {
  folders: ({
    id: string;
    name: string;
    createdAt: Date;
    workspaceId: string | null;
  } & {
    _count: {
      videos: number;
    };
  })[];
}

const initialState: initialStateProps = {
  folders: [],
};

export const foldersSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    setFolders: (state, action: PayloadAction<initialStateProps>) => {
      return {
        ...state,
        folders: action.payload.folders,
      };
    },
    addFolder: (
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        createdAt: Date;
        workspaceId: string | null;
        _count: {
          videos: number;
        };
      }>
    ) => {
      state.folders.push(action.payload);
    },
    removeFolder: (state, action: PayloadAction<string>) => {
      state.folders = state.folders.filter(
        (folder) => folder.id !== action.payload
      );
    },
  },
});

export const { setFolders, addFolder, removeFolder } = foldersSlice.actions;
export default foldersSlice.reducer;
