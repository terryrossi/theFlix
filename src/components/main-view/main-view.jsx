import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';

export const MainView = () => {
	const [movies, setMovies] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const storedUser = JSON.parse(localStorage.getItem('user'));
	const storedToken = localStorage.getItem('token');

	// Constructor
	useEffect(() => {
		if (!token) {
			return;
		}
		// else...
		fetch('https://theflix-api.herokuapp.com/movies', {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((response) => response.json())
			.then((data) => {
				const movies = data.map((movie) => {
					return {
						id: movie._id,
						title: movie.title,
						genre: movie.genre.name,
						description: movie.description,
						director: movie.director.name,
						image: movie.imageURL,
						// actors: movie.actors?.[0],
					};
				});
				setMovies(movies);
			});
	}, [token]);

	// Login or Signup
	if (!user) {
		return (
			<>
				<LoginView
					onLoggedIn={(user, token) => {
						setUser(user);
						setToken(token);
					}}
				/>
				New User:
				<SignupView
					onSignup={(user) => {
						setUser(user);
					}}
				/>
			</>
		);
	}

	// Logout
	const onLogout = (user) => {
		setUser(null);
		setToken(null);
		localStorage.clear();
	};

	// Signup

	// When a MovieCard is clicked
	if (selectedMovie) {
		const similarMovies = movies.filter((movie) => {
			return movie.id !== selectedMovie.id && movie.genre === selectedMovie.genre;
		});
		return (
			<>
				<MovieView
					movie={selectedMovie}
					onBackClick={() => setSelectedMovie(null)}
				/>
				<hr />
				<h2>Similar Movies : </h2>

				{similarMovies.map((movie) => (
					<MovieCard
						key={movie._id}
						movie={movie}
						onMovieClick={(newSelectedMovie) => {
							setSelectedMovie(newSelectedMovie);
						}}
					/>
				))}
			</>
		);
	}

	// If no Movie from API
	if (movies.length === 0) {
		return <div>The list is empty!</div>;
	}

	// ... Else... If movies then render all MovieCards
	// and Logout Button
	return (
		<>
			<div>
				{movies.map((movie) => (
					<MovieCard
						key={movie._id}
						movie={movie}
						onMovieClick={(newSelectedMovie) => {
							setSelectedMovie(newSelectedMovie);
						}}
					/>
				))}
			</div>
			<button onClick={onLogout}>Logout</button>
		</>
	);
};
