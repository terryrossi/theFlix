import React from 'react';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export const LoginView = ({ onLoggedIn }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();

		fetch(`https://theflix-api.herokuapp.com/login?userName=${username}&password=${password}`, {
			method: 'POST',
			// header: {
			// 	'content-type': 'application/json',
			// },
			// body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.user) {
					console.log(
						'in login. data.user data.token data.user.userName: ',
						data.user,
						data.token,
						data.user.userName
					);
					localStorage.setItem('user', JSON.stringify(data.user));
					localStorage.setItem('token', data.token);
					localStorage.setItem('userName', data.user.userName);
					onLoggedIn(data.user.userName, data.token);
				} else {
					alert('No such User');
				}
			})
			.catch((e) => {
				alert('something went wrong');
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
