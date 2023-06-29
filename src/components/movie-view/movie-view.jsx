// import { useState } from 'react';
import './movie-view.scss';
import { Row, Col, Card, Button } from 'react-bootstrap';

import { MainView } from '../main-view/main-view';
export const MovieView = ({
	movie,

	onBackClick,
}) => {
	// const [selectedMovie, setSelectedMovie] = useState(null);
	return (
		<>
			<Row style={{ marginTop: '80px' }}>
				<Col></Col>
				<Col
					md={6}
					sm={9}
					xs={12}>
					<Card
						style={{ marginTop: '10px', boxShadow: '1px 1px 10px 0px rgb(41, 39, 39)' }}
						// onClick={() => onMovieClick(movie)}
					>
						<Card.Img
							variant='top'
							src={movie.image}
							alt={'Poster of the movie'}
						/>
						<Card.Body>
							<Card.Title className='text-center'>{movie.title}</Card.Title>
							<hr />
							<Card.Text>Genre: {movie.genre}</Card.Text>
							<Card.Text>Description: {movie.description}</Card.Text>
							<Card.Text>Director: {movie.director}</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col></Col>
			</Row>
			<Row>
				<Col></Col>
				<Col
					md={6}
					sm={9}
					xs={12}>
					<Card style={{ marginTop: '15px', marginBottom: '15px' }}>
						<Button
							variant='primary'
							type='submit'
							onClick={onBackClick}>
							Back
						</Button>
					</Card>
				</Col>
				<Col></Col>
			</Row>
		</>
	);
};
