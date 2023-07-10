import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

export const ProfileView = ({ user }) => {
	const { userName } = useParams();
	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	const storedUser = JSON.parse(localStorage.getItem('user'));
	const storedToken = localStorage.getItem('token');
	const token = storedToken ? storedToken : '';
	useEffect(() => {
		if (!token) {
			return;
		}
		setFirstName(storedUser.firstName);
		setLastName(storedUser.lastName);
		setEmail(storedUser.email);
	}, []);

	const handleFirstNameChange = (event) => {
		setFirstName(event.target.value);
	};
	const handleLastNameChange = (event) => {
		setLastName(event.target.value);
	};
	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handleUpdateUser = () => {
		const updatedUser = storedUser;

		updatedUser.firstName = firstName;
		updatedUser.lastName = lastName;
		updatedUser.userName = userName;
		updatedUser.email = email;

		// Update user data via API
		fetch(`https://theflix-api.herokuapp.com/users/`, {
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
					alert('Your Account has been Modified');
					localStorage.setItem('user', JSON.stringify(updatedUser));
					// localStorage.setItem('user', updatedUser);
				}
			})
			.catch((e) => {
				console.log('error occurred during modification of user: ', e);
			});
	};

	return (
		// <Form onSubmit={handleUpdateUser}>
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
				// type='submit'
				style={{ marginTop: '15px' }}
				onClick={handleUpdateUser}>
				Update User
			</Button>
		</Form>
	);
};
