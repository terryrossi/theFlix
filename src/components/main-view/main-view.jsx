import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { ProfileView } from '../profile-view/profile-view';
import { Row, Col } from 'react-bootstrap';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setMovies } from '../../redux/reducers/movies';
import { setUser } from '../../redux/reducers/user';
import { setSelectedMovie } from '../../redux/reducers/selectedMovie';

export const MainView = () => {
	const movies = useSelector((state) => state.movies);
	console.log('in Mainview => state.movies.value): ', movies);
	const selectedMovie = useSelector((state) => state.selectedMovie);
	console.log('in Mainview => state.selectedMovie): ', selectedMovie);

	const [similarMovies, setSimilarMovies] = useState([]);

	const user = useSelector((state) => state.user);
	console.log('in mainview, user : ', user);

	const dispatch = useDispatch();

	let token = localStorage.getItem('token');

	// Constructors

	// If Logged In... Fetch Movies
	useEffect(() => {
		console.log('token and user in useeffect mainview : ', token, user);
		if (!token) {
			return;
		}
		// else...
		fetch('https://theflix-api.herokuapp.com/movies', {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((response) => response.json())
			.then((data) => {
				const moviesFromApi = data.map((movie) => {
					return {
						id: movie._id,
						title: movie.title,
						genre: movie.genre.name,
						description: movie.description,
						director: movie.director.name,
						image: movie.imageURL,
						// actors: movie.actors?.[0],
					};
				});
				// setMovies(movies);
				dispatch(setMovies(moviesFromApi));
			});
	}, [user]);

	useEffect(() => {
		if (selectedMovie && token) {
			const similarMovies = movies.filter((movie) => {
				return movie.id !== selectedMovie.id && movie.genre === selectedMovie.genre;
			});
			setSimilarMovies(similarMovies);
		}
	}, [selectedMovie, movies, token]);

	// Logout function
	// const handleLogout = () => {
	// 	dispatch(setUser(null));
	// setToken(null);
	// setSelectedMovie(null);
	// let token = null;
	// localStorage.clear();
	// console.log('LOGGED OUT : ', user, token);
	// };

	return (
		<BrowserRouter>
			<NavigationBar />
			<Row className='justify-content-md-center'>
				<Routes>
					<Route
						path='/signup'
						element={
							<>
								{token ? (
									<Navigate to='/' />
								) : (
									<Row style={{ marginTop: '100px' }}>
										<Col></Col>
										<Col
											md={6}
											style={{
												// border: '1px solid black',
												boxShadow: '1px 1px 10px 0px rgb(41, 39, 39)',
												borderRadius: '9px',
												padding: '15px',
											}}>
											<h4>New User. Please Signup...</h4>
											<SignupView />
										</Col>
										<Col></Col>
									</Row>
								)}
							</>
						}
					/>
					<Route
						path='/login'
						element={
							<>
								{token ? (
									<Navigate to='/' />
								) : (
									<Row style={{ marginTop: '100px' }}>
										<Col></Col>
										<Col
											md={6}
											style={{
												boxShadow: '1px 1px 10px 0px rgb(41, 39, 39)',
												borderRadius: '9px',
												padding: '15px',
											}}>
											<h4>Existing User. Please Login...</h4>
											<LoginView />
										</Col>
										<Col></Col>
									</Row>
								)}
							</>
						}
					/>
					<Route
						path='/movies/:movieId'
						element={
							<>
								{!token ? (
									<Navigate
										to='/login'
										replace
									/>
								) : movies.length === 0 ? (
									<Col>The list is empty!</Col>
								) : (
									<>
										<Row style={{ marginTop: '100px' }}>
											{/* <MovieView movies={movies} /> */}
											<MovieView />
											<hr />

											<h2>Similar Movies : </h2>
										</Row>
										<Row>
											{similarMovies.map((movie) => (
												<Col
													// style={{ border: '1px solid black' }}
													key={movie.id}
													lg={3}
													md={4}
													xs={6}>
													<MovieCard
														movie={movie}
														// onMovieClick={(newSelectedMovie) => {
														// 	setSelectedMovie(newSelectedMovie);
														// }}
													/>
												</Col>
											))}
										</Row>
									</>
								)}
							</>
						}
					/>
					<Route
						path='/'
						element={
							<>
								{token ? (
									<>
										<Row style={{ marginTop: '90px' }}>
											{movies.map((movie) => (
												<Col
													// style={{ border: '1px solid black' }}
													key={movie.id}
													lg={3}
													md={4}
													xs={6}>
													<MovieCard
														// key={movie.id}
														movie={movie}
														onMovieClick={(newSelectedMovie) => {
															setSelectedMovie(newSelectedMovie);
														}}
													/>
												</Col>
											))}
										</Row>
									</>
								) : (
									<Col>Please Login...</Col>
								)}
							</>
						}
					/>

					<Route
						path='/users/:userName'
						element={
							<>
								{token ? (
									<>
										<Row style={{ marginTop: '100px' }}>
											<Col></Col>
											<Col
												md={6}
												style={{
													// border: '1px solid black',
													boxShadow: '1px 1px 10px 0px rgb(41, 39, 39)',
													borderRadius: '9px',
													padding: '15px',
												}}>
												<h4>User Profile</h4>
												<ProfileView />
											</Col>
											<Col></Col>
										</Row>
									</>
								) : (
									<Col>Please Login...</Col>
								)}
							</>
						}
					/>
				</Routes>
			</Row>
		</BrowserRouter>
	);
};
