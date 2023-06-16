// Import the PropTypes library
import PropTypes from 'prop-types';

// export const MovieCard = (props) => {
//   return <div>{props.movie.title}</div>;
// };
// or...
export const MovieCard = ({ movie, onMovieClick }) => {
	// console.log('in MovieCard : ' + movie.title);
	return (
		<div
			onClick={() => {
				onMovieClick(movie);
			}}>
			{movie.title}
		</div>
	);
};

// Definition for all Props Constraints
MovieCard.propTypes = {
	movie: PropTypes.shape({
		title: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
	}).isRequired,

	onMovieClick: PropTypes.func.isRequired,
};
