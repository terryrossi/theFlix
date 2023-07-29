import { createSlice } from '@reduxjs/toolkit';

const favoriteMoviesSlice = createSlice({
	name: 'favoriteMovies',
	initialState: { list: [], filter: '' },
	reducers: {
		setFavoriteMovies: (state, action) => {
			state.list = action.payload;
		},
		setFavoriteMoviesFilter: (state, action) => {
			state.filter = action.payload;
		},
	},
});

export const { setFavoriteMovies, setFavoriteMoviesFilter } = favoriteMoviesSlice.actions;

export default favoriteMoviesSlice.reducer;
