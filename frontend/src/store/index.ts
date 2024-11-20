// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { Tool, Category } from '@/types';

// Define types
interface ToolsState {
  items: Tool[];
  loading: boolean;
  error: string | null;
  filters: {
    category: string | null;
    pricing: string | null;
    searchQuery: string;
  };
}

interface AuthState {
  user: {
    id: number;
    name: string;
    email: string;
  } | null;
  isAuthenticated: boolean;
  loading: boolean;
}

// Define initial states
const initialToolsState: ToolsState = {
  items: [],
  loading: false,
  error: null,
  filters: {
    category: null,
    pricing: null,
    searchQuery: '',
  },
};

const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

// Create slices
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const toolsSlice = createSlice({
  name: 'tools',
  initialState: initialToolsState,
  reducers: {
    setTools: (state, action: PayloadAction<Tool[]>) => {
      state.items = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setFilter: (state, action: PayloadAction<Partial<typeof initialToolsState.filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    signOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

// Configure store
export const store = configureStore({
  reducer: {
    tools: toolsSlice.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Export actions
export const { setTools, setLoading, setError, setFilter } = toolsSlice.actions;
export const { setUser, signOut, setAuthLoading } = authSlice.actions;

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;