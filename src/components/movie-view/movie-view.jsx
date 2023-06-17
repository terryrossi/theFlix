// import { useState } from 'react';

import { MainView } from '../main-view/main-view';
export const MovieView = ({
	movie,

	onBackClick,
}) => {
	// const [selectedMovie, setSelectedMovie] = useState(null);
	return (
		<div class='cards'>
			<div class='card'>
				<img
					alt='Movie'
					src={movie.image}
				/>
			</div>
			<div>
				<h1>{movie.title}</h1>

				<h4>Genre: {movie.genre}</h4>
				<h4>Description: {movie.description}</h4>
				<h4>Director: {movie.director}</h4>
				<button onClick={onBackClick}>Back</button>
			</div>
		</div>
	);
};
