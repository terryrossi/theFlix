import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
	const [movies, setMovies] = useState([]);

	const [selectedMovie, setSelectedMovie] = useState(null);

	useEffect(() => {
		fetch('https://theflix-api.herokuapp.com/movies')
			.then((response) => response.json())
			.then((data) => {
				const movies = data.map((movie) => {
					// console.log(movie._id, movie.title);
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
				// console.log(movies);
				setMovies(movies);
			});
	}, []);

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

	if (movies.length === 0) {
		return <div>The list is empty!</div>;
	}
	// console.log(movies[0].title);

	return (
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
	);
};
