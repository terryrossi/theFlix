import React, { useEffect, useState } from 'react';

import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
// import './movie-view.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/reducers/user';
// import { setSelectedMovie } from '../../redux/reducers/selectedMovie';

export const MovieView = () => {
	// Locale Storage
	let storedUser = JSON.parse(localStorage.getItem('user'));
	let token = localStorage.getItem('token');

	// useSelectors...
	const movies = useSelector((state) => state.movies.list);
	const favoriteMovies = useSelector((state) => state.favoriteMovies.list);
	const selectedMovie = useSelector((state) => state.selectedMovie);
	let user = useSelector((state) => state.user) ? useSelector((state) => state.user) : storedUser;

	// Variables
	const { movieId } = useParams();
	if (movieId !== selectedMovie.id) console.log('*** INCONSISTENT MOVIE ID ***');
	// const selectedMovie = movies.find((b) => b.id === movieId);

	// useStates...
	const [favorited, setFavorited] = useState(false);

	const dispatch = useDispatch();

	if (!user && storedUser) {
		user = storedUser;
		dispatch(setUser(storedUser));
	}

	// FUNCTION TO CHECK IF the movie.Id passed as a param is on the list of FavoriteMovies
	// In order to show the Button as "Favorited" or 'Favorite' and switch back and forth
	const isFavorited = (favoriteMovies) => {
		return favoriteMovies.some((mov) => mov.id === selectedMovie.id);
	};

	// UseEffect to avoid looping on favorited
	useEffect(() => {
		setFavorited(isFavorited(favoriteMovies));
	}, [selectedMovie]);

	// THIS FUNCTION ADDS THE selectedMovie TO the USER's list of favorites IN THE DATABAS
	const addFavorite = function (selectedMovie) {
		// Update user data to add a favorite Movie via API
		fetch(`https://theflix-api.herokuapp.com/users/${user.userName}/favorites`, {
			// fetch(`localhost:8080/users/${user.userName}/favorites`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(selectedMovie),
		})
			.then((response) => {
				// something went wrong?
				if (!response.ok) {
					// Inspect the response
					response
						.json()
						// destructuring the response
						.then(({ errors }) => {
							// errors is an array
							errors.forEach((err) => {
								// Print one alert for each error founded
								alert(
									`STATUS CODE: ${response.status}\nMESSAGE: ${err.msg}\nFIELD: ${err.path}\nVALUE: ${err.value}`
								);
							});
						});
				} else {
					response.json().then((updatedUser) => {
						localStorage.setItem('user', JSON.stringify(updatedUser));
						dispatch(setUser(updatedUser));

						// alert(`${selectedMovie.title} has been added to your Favorites`);
					});
				}
			})
			.catch((e) => {
				console.log('error occurred during addition of a new movie in list of Favorites : ', e);
			});
	};

	// THIS FUNCTION REMOVES THE selectedMovie FROM the USER's list of favorites IN THE DATABAS
	const removeFavorite = function (selectedMovie) {
		// Update user data to add a favorite Movie via API
		fetch(`https://theflix-api.herokuapp.com/users/${user.userName}/favorites`, {
			// fetch(`localhost:8080/users/${user.userName}/favorites`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(selectedMovie),
		})
			.then((response) => {
				// something went wrong?
				if (!response.ok) {
					// Inspect the response
					response
						.json()
						// destructuring the response
						.then(({ errors }) => {
							// errors is an array
							errors.forEach((err) => {
								// Print one alert for each error founded
								alert(
									`STATUS CODE: ${response.status}\nMESSAGE: ${err.msg}\nFIELD: ${err.path}\nVALUE: ${err.value}`
								);
							});
						});
				} else {
					response.json().then((updatedUser) => {
						localStorage.setItem('user', JSON.stringify(updatedUser));
						dispatch(setUser(updatedUser));
						// alert(`${selectedMovie.title} has been REMOVED from your Favorites`);
					});
				}
			})
			.catch((e) => {
				console.log('error occurred during removal of a movie in list of Favorites : ', e);
			});
	};

	// Function to handle ADDING or REMOVING favorite movie
	const handleFavoriteClick = (event) => {
		event.preventDefault();

		if (favorited) {
			removeFavorite(selectedMovie);
		} else {
			addFavorite(selectedMovie);
		}
		setFavorited(!favorited);
	};

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
						<Row nogutters='true'>
							<Col
								md={4}
								className='d-flex flex-column align-items-center'>
								<Card.Img
									variant='top'
									src={selectedMovie.image}
									alt='Poster of the movie'
								/>
								<Button
									variant={favorited ? 'light' : 'outline-danger'}
									onClick={handleFavoriteClick}
									style={{ margin: '10px' }}>
									{favorited ? '❤️ Favorited' : '♡ Favorite'}
								</Button>
							</Col>
							<Col md={8}>
								<Card.Body>
									<Card.Title className='text-center'>{selectedMovie.title}</Card.Title>
									<hr />
									<Card.Text>Genre: {selectedMovie.genre}</Card.Text>
									<Card.Text>Description: {selectedMovie.description}</Card.Text>
									<Card.Text>Director: {selectedMovie.director}</Card.Text>
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
								Back to Movie List
							</Button>
						</Link>
					</Card>
				</Col>
				<Col></Col>
			</Row>
		</>
	);
};
