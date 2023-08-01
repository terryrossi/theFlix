import React, { useState } from 'react';
// Import the PropTypes library
import PropTypes from 'prop-types';

import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedMovie } from '../../redux/reducers/selectedMovie';

// export const MovieCard = (props) => {
//   return <div>{props.movie.title}</div>
// };
// or...
export const MovieCard = ({ movie }) => {
	const dispatch = useDispatch();

	return (
		<Link
			onClick={() => dispatch(setSelectedMovie(movie))}
			to={`/movies/${encodeURIComponent(movie.id)}`}
			style={{ textDecoration: 'none' }}>
			<Card
				style={{
					marginTop: '10px',
					boxShadow: '1px 1px 10px 0px rgb(41, 39, 39)',
				}}>
				<Card.Img
					variant='top'
					src={movie.image}
					alt={'Poster of the movie'}
					style={{
						width: '100%',
						// height: '100%',
						objectFit: 'cover',
						// borderRadius: '9px',
						// padding: '15px',
						// boxShadow: '1px 1px 10px 0px rgb(41, 39, 39)',
					}}
				/>
				<Card.Body className='d-flex flex-column align-items-center'>
					<Card.Title
						className='text-center'
						style={{ color: 'black' }}>
						{movie.title}
					</Card.Title>
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
