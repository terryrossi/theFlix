import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export const SignupView = () => {
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [birthDate, setBirthDate] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();

		const data = {
			firstName: firstName,
			lastName: lastName,
			userName: userName,
			email: email,
			password: password,
			birthDate: birthDate,
		};
		console.log('Avant le fetch data: ', data);
		fetch(`https://theflix-api.herokuapp.com/users`, {
			method: 'POST',
			header: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('Signup response: ', data);
			})
			.catch((e) => {
				alert('something went wrong');
			});
	};
	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group controlId='formFirstName'>
				<Form.Label>FirstName:</Form.Label>
				<Form.Control
					type='text'
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					required
				/>
			</Form.Group>
			<Form.Group controlId='formLastName'>
				<Form.Label>LastName:</Form.Label>
				<Form.Control
					type='text'
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					required
				/>
			</Form.Group>
			<Form.Group controlId='formEmail'>
				<Form.Label>Email:</Form.Label>
				<Form.Control
					type='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</Form.Group>
			<Form.Group controlId='formBirthDate'>
				<Form.Label>BirthDate:</Form.Label>
				<Form.Control
					type='date'
					value={birthDate}
					onChange={(e) => setBirthDate(e.target.value)}
					required
				/>
			</Form.Group>
			<Form.Group controlId='formNewUserName'>
				<Form.Label>UserName:</Form.Label>
				<Form.Control
					type='text'
					minLength={5}
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
					required
				/>
			</Form.Group>

			<Form.Group controlId='formNewPassword'>
				<Form.Label>Password:</Form.Label>
				<Form.Control
					type='password'
					minLength={8}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</Form.Group>

			<Button
				variant='primary'
				type='submit'>
				Submit
			</Button>
		</Form>
	);
};
