// Import the PropTypes library
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

// export const MovieCard = (props) => {
//   return <div>{props.movie.title}</div>;
// };
// or...
export const MovieCard = ({ movie, onMovieClick }) => {
	return (
		<Card
			style={{ marginTop: '10px', boxShadow: '1px 1px 10px 0px rgb(41, 39, 39)' }}
			onClick={() => onMovieClick(movie)}
			key={movie.id}>
			<Card.Img
				variant='top'
				src={movie.image}
				alt={'Poster of the movie'}
				style={{
					// width: '100%',
					// height: '100%',
					height: '350px',
					objectFit: 'cover',
					// borderRadius: '9px',
					// padding: '15px',
					// boxShadow: '1px 1px 10px 0px rgb(41, 39, 39)',
				}}
			/>
			<Card.Body>
				<Card.Title className='text-center'>{movie.title}</Card.Title>
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
