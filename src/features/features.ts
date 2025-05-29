import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface MainState {
  selectedCategory: string;
  searchQuery: string;
}

const initialState: MainState = {
  selectedCategory: 'Beef',
  searchQuery: '',
};

const globalSlice = createSlice({
  name: 'globalState',
  initialState,
  reducers: {
    setSelectedCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

export const { setSelectedCategory, setSearchQuery } = globalSlice.actions;
export default globalSlice.reducer;
