import React from 'react';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export const LoginView = ({ onLoggedIn }) => {
	// export const LoginView = () => {
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
				if (data.user) {
					localStorage.setItem('user', JSON.stringify(data.user));
					localStorage.setItem('token', data.token);
					// setUser(data.user);
					console.log('User Logged In : ', data.user, data.token);
					onLoggedIn(data.user, data.token);
				}
			})
			.catch((e) => {
				alert('something went wrong in Login');
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
