import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card.jsx';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
	const [movies, setMovies] = useState([
		{
			id: 1,
			title: 'Superman',
			image: 'https://a.co/d/hM92oRg',
			Actor: 'Henry Cavill',
		},
		{
			id: 2,
			title: 'Batman',
			image: 'https://a.co/d/3WH4qKF',
			author: 'Christian Bale',
		},
		{
			id: 3,
			title: 'Ironman',
			image: 'https://a.co/d/6qaUevl',
			author: 'Robert Downey Jr',
		},
		{
			id: 4,
			title: 'Captain Amaerica',
			image: 'https://a.co/d/5tm0RP1',
			author: 'Chris Evans',
		},
		{
			id: 5,
			title: 'Wonder Woman',
			image: 'https://a.co/d/5nxvNJv',
			author: 'Gal Gabot',
		},
	]);

	const [selectedMovie, setSelectedMovie] = useState(null);

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

	return (
		<div>
			{movies.map((movie) => (
				<MovieCard
					key={movie.id}
					movie={movie}
					onMovieClick={(newSelectedMovie) => {
						setSelectedMovie(newSelectedMovie);
					}}
				/>
			))}
		</div>
	);
};
