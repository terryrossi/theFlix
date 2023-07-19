import { createSlice } from '@reduxjs/toolkit';

const selectedMovieSlice = createSlice({
	name: 'selectedMovie',
	initialState: null,
	reducers: {
		setSelectedMovie: (state, action) => action.payload,
	},
});

export const { setSelectedMovie } = selectedMovieSlice.actions;

export default selectedMovieSlice.reducer;
