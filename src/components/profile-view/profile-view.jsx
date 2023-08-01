import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/reducers/user';
// import { setFavoriteMovies } from '../../redux/reducers/favoriteMovies';
// import { MoviesList } from '../movies-list/movies-list';

export const ProfileView = () => {
	const { userName } = useParams();

	// Local Storage...
	let storedUser = JSON.parse(localStorage.getItem('user'));
	const token = localStorage.getItem('token');

	// useSelectors...
	let user = useSelector((state) => state.user);

	if (storedUser && !user) {
		user = storedUser;
	}

	// States...
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');

	const [formHasChanged, setFormHasChanged] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		if (!token) {
			return;
		}
		if (user) {
			setFirstName(user.firstName);
			setLastName(user.lastName);
			setEmail(user.email);
		}
	}, []);

	const handleFirstNameChange = (event) => {
		setFirstName(event.target.value);
		setFormHasChanged(true);
	};
	const handleLastNameChange = (event) => {
		setLastName(event.target.value);
		setFormHasChanged(true);
	};
	const handleEmailChange = (event) => {
		setEmail(event.target.value);
		setFormHasChanged(true);
	};

	const handleUpdateUser = () => {
		if (formHasChanged) {
			const updatedUser = {
				...user,
				firstName: firstName,
				lastName: lastName,
				email: email,
			};

			// Update user data via API
			fetch(`https://theflix-api.herokuapp.com/users/`, {
				// fetch(`localhost:8080/users/`, {
				method: 'PATCH',
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(updatedUser),
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
						// account has been modified successfully
						// and the local storage needs to be in sync
						alert('Your Account has been Updated');
						localStorage.setItem('user', JSON.stringify(updatedUser));
						dispatch(setUser(updatedUser));
					}
				})
				.catch((e) => {
					console.log('error occurred during modification of user: ', e);
				});
		}
	};
	return (
		<Form>
			<Form.Group controlId='formFirstName'>
				<Form.Label>FirstName:</Form.Label>
				<Form.Control
					type='text'
					value={firstName}
					onChange={handleFirstNameChange}
					required
				/>
			</Form.Group>
			<Form.Group controlId='formLastName'>
				<Form.Label>LastName:</Form.Label>
				<Form.Control
					type='text'
					value={lastName}
					onChange={handleLastNameChange}
					required
				/>
			</Form.Group>
			<Form.Group controlId='formEmail'>
				<Form.Label>Email:</Form.Label>
				<Form.Control
					type='email'
					value={email}
					onChange={handleEmailChange}
					required
				/>
			</Form.Group>

			<Button
				variant='primary'
				style={{ marginTop: '15px' }}
				onClick={handleUpdateUser}
				disabled={!formHasChanged}>
				Update User
			</Button>
		</Form>
	);
};
