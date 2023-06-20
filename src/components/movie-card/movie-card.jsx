// Import the PropTypes library
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

// export const MovieCard = (props) => {
//   return <div>{props.movie.title}</div>;
// };
// or...
export const MovieCard = ({ movie, onMovieClick }) => {
	// console.log('in MovieCard : ' + movie.title);
	return (
		<Card onClick={() => onMovieClick(movie)}>
			<Card.Img
				variant='top'
				src={movie.image}
			/>
			<Card.Body>
				<Card.Title>{movie.title}</Card.Title>
			</Card.Body>
		</Card>
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
