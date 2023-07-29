import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './reducers/movies';
import userReducer from './reducers/user';
import selectedMovieReducer from './reducers/selectedMovie';
import favoriteMoviesReducer from './reducers/favoriteMovies';

export const store = configureStore({
	reducer: {
		movies: moviesReducer,
		user: userReducer,
		selectedMovie: selectedMovieReducer,
		favoriteMovies: favoriteMoviesReducer,
	},
});
