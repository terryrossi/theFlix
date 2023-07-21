// import { useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import './movie-view.scss';
import { useSelector } from 'react-redux';

// import { MainView } from '../main-view/main-view';
// export const MovieView = ({ movies }) => {
export const MovieView = () => {
	const { movieId } = useParams();

	const movies = useSelector((state) => state.movies.list);

	const movie = movies.find((b) => b.id === movieId);

	console.log('in MovieView : movie = ', movie);

	return (
		<>
			{/* <Row style={{ marginTop: '0px' }}> */}
			<Row>
				<Col></Col>
				<Col
					xs={10}
					md={10}
					sm={10}
					lg={8}
					xl={6}>
					<Card style={{ marginTop: '10px', boxShadow: '1px 1px 10px 0px rgb(41, 39, 39)' }}>
						<Row nogutters>
							<Col md={4}>
								<Card.Img
									variant='top'
									src={movie.image}
									alt='Poster of the movie'
								/>
							</Col>
							<Col md={8}>
								<Card.Body>
									<Card.Title className='text-center'>{movie.title}</Card.Title>
									<hr />
									<Card.Text>Genre: {movie.genre}</Card.Text>
									<Card.Text>Description: {movie.description}</Card.Text>
									<Card.Text>Director: {movie.director}</Card.Text>
								</Card.Body>
							</Col>
						</Row>
					</Card>
				</Col>
				<Col></Col>
			</Row>
			<Row>
				<Col></Col>
				<Col
					xs={10}
					md={10}
					sm={10}
					lg={8}
					xl={6}>
					<Card style={{ marginTop: '15px', marginBottom: '15px' }}>
						<Link
							to={`/`}
							style={{ width: '100%' }}>
							<Button
								style={{ width: '100%' }}
								variant='primary'
								type='submit'>
								Back
							</Button>
						</Link>
					</Card>
				</Col>
				<Col></Col>
			</Row>
		</>
	);
};
