// Import the PropTypes library
import PropTypes from 'prop-types';

import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// export const MovieCard = (props) => {
//   return <div>{props.movie.title}</div>;
// };
// or...
export const MovieCard = ({ movie }) => {
	return (
		<Link
			to={`/movies/${encodeURIComponent(movie.id)}`}
			style={{ textDecoration: 'none' }}>
			<Card
				style={{ marginTop: '10px', boxShadow: '1px 1px 10px 0px rgb(41, 39, 39)' }}
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
					<Card.Title
						className='text-center'
						style={{ color: 'black' }}>
						{movie.title}
					</Card.Title>
					{/* <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
						<Button variant='link'>Open</Button>
					</Link> */}
				</Card.Body>
			</Card>
		</Link>
	);
};

// Definition for all Props Constraints
MovieCard.propTypes = {
	movie: PropTypes.shape({
		title: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
	}).isRequired,
};
