import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { ProfileView } from '../profile-view/profile-view';
import { Row, Col } from 'react-bootstrap';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export const MainView = () => {
	const [movies, setMovies] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [similarMovies, setSimilarMovies] = useState([]);

	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);

	// Constructors

	// Check Logged In?
	useEffect(() => {
		// Check if there is a logged-in user in localStorage
		const storedUser = localStorage.getItem('user') ? localStorage.getItem('user') : null;
		// console.log('storedUser : ', storedUser);
		if (storedUser) {
			const parsedUser = storedUser ? JSON.parse(storedUser) : null;
			setUser(parsedUser);
		}
		const storedToken = localStorage.getItem('token');
		if (storedToken) {
			setToken(storedToken);
		}
		// console.log('in MainView (user, token): ', user, token);
	}, [token]);

	// If Logged In... Fetch Movies
	useEffect(() => {
		if (!token) {
			return;
		}
		// else...
		fetch('https://theflix-api.herokuapp.com/movies', {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((response) => response.json())
			.then((data) => {
				const movies = data.map((movie) => {
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
				setMovies(movies);
			});
	}, [token]);

	useEffect(() => {
		if (selectedMovie && token) {
			const similarMovies = movies.filter((movie) => {
				return movie.id !== selectedMovie.id && movie.genre === selectedMovie.genre;
			});
			setSimilarMovies(similarMovies);
		}
	}, [selectedMovie, movies, token]);

	// Logout function
	const handleLogout = () => {
		setUser(null);
		setToken(null);
		setSelectedMovie(null);
		localStorage.clear();
		// console.log('LOGGED OUT : ', user, token);
	};

	return (
		<BrowserRouter>
			<NavigationBar
				// user={user}
				onLogout={handleLogout}
			/>
			<Row className='justify-content-md-center'>
				<Routes>
					<Route
						path='/signup'
						element={
							<>
								{token ? (
									<Navigate to='/' />
								) : (
									<Row style={{ marginTop: '80px' }}>
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
											<SignupView
												onSignup={(user, token) => {
													setUser(user);
													setToken(token);
												}}
											/>
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
									<Row style={{ marginTop: '80px' }}>
										<Col></Col>
										<Col
											md={6}
											style={{
												boxShadow: '1px 1px 10px 0px rgb(41, 39, 39)',
												borderRadius: '9px',
												padding: '15px',
											}}>
											<h4>Existing User. Please Login...</h4>
											<LoginView
												onLoggedIn={(user, token) => {
													setUser(user);
													setToken(token);
												}}
											/>
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
										<Row style={{ marginTop: '80px' }}>
											<MovieView movies={movies} />
											<hr />

											<h2>Similar Movies : </h2>
										</Row>
										<Row>
											{similarMovies.map((movie) => (
												<Col
													// style={{ border: '1px solid black' }}
													key={movie.id}
													md={3}
													sm={6}>
													<MovieCard
														movie={movie}
														onMovieClick={(newSelectedMovie) => {
															setSelectedMovie(newSelectedMovie);
														}}
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
										<Row style={{ marginTop: '80px' }}>
											{movies.map((movie) => (
												<Col
													// style={{ border: '1px solid black' }}
													key={movie.id}
													md={3}
													sm={6}
													xs={12}>
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
										<Row style={{ marginTop: '80px' }}>
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
												<ProfileView user={user} />
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
