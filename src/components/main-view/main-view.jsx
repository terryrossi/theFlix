import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { Row, Col } from 'react-bootstrap';
import { MyHeader } from '../header/header';

export const MainView = () => {
	const [movies, setMovies] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState(null);
	// const [similarMovies, setSimilarMovies] = useState([]);
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const storedUser = JSON.parse(localStorage.getItem('user'));
	const storedToken = localStorage.getItem('token');

	// Constructor
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

	// Logout
	const handleLogout = (user) => {
		setUser(null);
		setToken(null);
		localStorage.clear();
		console.log('LOGGED OUT');
	};

	if (selectedMovie) {
		const similarMovies = movies.filter((movie) => {
			return movie.id !== selectedMovie.id && movie.genre === selectedMovie.genre;
		});

		return (
			// When a MovieCard is clicked
			<>
				<MyHeader onLogout={handleLogout} />
				<Row style={{ marginTop: '80px' }}>
					<MovieView
						key={selectedMovie.id}
						movie={selectedMovie}
						onBackClick={() => setSelectedMovie(null)}
					/>
					<hr />
					<h2>Similar Movies : </h2>

					{similarMovies.map((movie) => (
						<Col
							// style={{ border: '1px solid black' }}
							md={3}
							sm={6}>
							<MovieCard
								key={movie.id}
								movie={movie}
								onMovieClick={(newSelectedMovie) => {
									setSelectedMovie(newSelectedMovie);
								}}
							/>
						</Col>
					))}
				</Row>
			</>
		);
	}

	// Login or Signup

	return (
		<>
			{!user ? (
				<>
					<MyHeader onLogout={handleLogout} />
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
					<Row style={{ marginTop: '30px' }}>
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
								onSignup={(user) => {
									setUser(user);
								}}
							/>
						</Col>
						<Col></Col>
					</Row>
				</>
			) : movies.length === 0 ? (
				// If no Movie from API
				<>
					<MyHeader onLogout={handleLogout} />

					<div>The list is empty!</div>
				</>
			) : (
				// ... Else... If movies then render all MovieCards
				// and Logout Button
				<>
					<MyHeader onLogout={handleLogout} />
					<Row style={{ marginTop: '80px' }}>
						{movies.map((movie) => (
							<Col
								// style={{ border: '1px solid black' }}
								md={3}
								sm={6}
								xs={12}>
								<MovieCard
									key={movie.id}
									movie={movie}
									onMovieClick={(newSelectedMovie) => {
										setSelectedMovie(newSelectedMovie);
									}}
								/>
							</Col>
						))}
					</Row>

					{/* <button onClick={handleLogout}>Logout</button> */}
				</>
			)}
		</>
	);
};
