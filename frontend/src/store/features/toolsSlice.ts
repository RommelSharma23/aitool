// src/store/features/toolsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toolsApi } from '@/utils/api';

interface ToolsState {
  items: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ToolsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchTools = createAsyncThunk(
  'tools/fetchTools',
  async () => {
    const response = await toolsApi.getTools();
    return response;
  }
);

const toolsSlice = createSlice({
  name: 'tools',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTools.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTools.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTools.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tools';
      });
  },
});

export default toolsSlice.reducer;