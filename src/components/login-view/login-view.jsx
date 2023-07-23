import React from 'react';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/reducers/user';

// export const LoginView = ({ onLoggedIn }) => {
export const LoginView = () => {
	const dispatch = useDispatch();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	// const [user, setUser] = useState(null);

	const handleSubmit = (event) => {
		event.preventDefault();

		fetch(`https://theflix-api.herokuapp.com/login?userName=${username}&password=${password}`, {
			method: 'POST',
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.token) {
					localStorage.setItem('user', JSON.stringify(data.user));
					localStorage.setItem('token', data.token);
					dispatch(setUser(data.user));
					// setUser(data.user);
					console.log('Logged In. favorites : ', data.user.favoriteMovies);

					// if (data.user.favoriteMovies) {
					// console.log('in Login, favorites : ', data.user.favoriteMovies);
					// fetchFavoriteMovies(data.user.favoriteMovies);
				}
				// console.log('Logged In as user: ', user);

				// onLoggedIn(data.user, data.token);
				// }
			})
			.catch((e) => {
				alert('something went wrong in Login');
			});
	};

	const fetchFavoriteMovies = (favorites) => {
		const token = localStorage.getItem('token');
		const favoriteMovies = [];

		favorites.forEach((favoriteId) => {
			fetch(`https://theflix-api.herokuapp.com/movies/id/${favoriteId}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
				.then((response) => response.json())
				.then((movie) => {
					favoriteMovies.push(movie);
					// If all favorite movies are fetched, store them in local storage
					if (favoriteMovies.length === favorites.length) {
						console.log('Fetched all favovite movies : ', favoriteMovies);
						localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
					}
				})
				.catch((error) => {
					console.error(`Error fetching favorite movie with ID ${favoriteId}:`, error);
				});
		});
	};

	return (
		<>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId='formUsername'>
					<Form.Label>UserName:</Form.Label>
					<Form.Control
						type='text'
						value={username}
						minLength={5}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</Form.Group>
				<Form.Group controlId='formPassword'>
					<Form.Label>Password:</Form.Label>
					<Form.Control
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</Form.Group>

				<Button
					style={{ marginTop: '15px' }}
					variant='primary'
					type='submit'>
					Submit
				</Button>
			</Form>
		</>
	);
};
