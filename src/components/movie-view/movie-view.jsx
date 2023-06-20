// import { useState } from 'react';
import './movie-view.scss';

import { MainView } from '../main-view/main-view';
export const MovieView = ({
	movie,

	onBackClick,
}) => {
	// const [selectedMovie, setSelectedMovie] = useState(null);
	return (
		<div className='cards'>
			<div className='card'>
				<img
					alt='Movie'
					src={movie.image}
					crossOrigin='anonymous'
				/>
			</div>
			<div>
				<h1>{movie.title}</h1>

				<h4>Genre: {movie.genre}</h4>
				<h4>Description: {movie.description}</h4>
				<h4>Director: {movie.director}</h4>
				<button
					className='back-button'
					onClick={onBackClick}>
					Back
				</button>
			</div>
		</div>
	);
};
