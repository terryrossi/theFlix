import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './reducers/movies';
import userReducer from './reducers/user';
import selectedMovieReducer from './reducers/selectedMovie';

export const store = configureStore({
	reducer: { movies: moviesReducer, user: userReducer, selectedMovie: selectedMovieReducer },
});
