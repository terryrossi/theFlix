import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
	const [movies, setMovies] = useState([
		// {
		// 	id: 1,
		// 	title: 'Superman',
		// 	image: 'https://m.media-amazon.com/images/I/510CJKGT6nL.jpg',
		// 	actor: 'Henry Cavill',
		// },
		// {
		// 	id: 2,
		// 	title: 'Batman',
		// 	image: 'https://m.media-amazon.com/images/I/71vUV3wgwKL._SL1500_.jpg',
		// 	actor: 'Christian Bale',
		// },
		// {
		// 	id: 3,
		// 	title: 'Ironman',
		// 	image: 'https://m.media-amazon.com/images/I/41W6U03Kr4L.jpg',
		// 	actor: 'Robert Downey Jr',
		// },
		// {
		// 	id: 4,
		// 	title: 'Captain Amaerica',
		// 	image: 'https://m.media-amazon.com/images/I/51-9t+DjrKL.jpg',
		// 	actor: 'Chris Evans',
		// },
		// {
		// 	id: 5,
		// 	title: 'Wonder Woman',
		// 	image: 'https://m.media-amazon.com/images/I/91Rtt7Zh7wL._SL1500_.jpg',
		// 	actor: 'Gal Gabot',
		// },
	]);

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
		return (
			<MovieView
				movie={selectedMovie}
				onBackClick={() => setSelectedMovie(null)}
			/>
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
