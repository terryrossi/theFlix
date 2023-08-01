import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

// export const SignupView = ({ onSignup }) => {
export const SignupView = () => {
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [birthDate, setBirthDate] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();

		let user = {
			firstName: firstName,
			lastName: lastName,
			userName: userName,
			email: email,
			password: password,
			birthDate: birthDate,
		};
		fetch(`https://theflix-api.herokuapp.com/users`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(user),
		})
			.then((response) => response.json())
			.then((user) => {
				// console.log(user);
				if (user) {
					fetch(
						`https://theflix-api.herokuapp.com/login?userName=${userName}&password=${password}`,
						{
							method: 'POST',
						}
					)
						.then((response) => response.json())
						.then((data) => {
							if (data.user) {
								// localStorage.setItem('user', JSON.stringify(data.user));
								localStorage.setItem('token', data.token);
								dispatch(setUser(data.user));
								// setUser(data.user);
								// console.log('User Logged In : ', data.user, data.token);
								alert('You are Logged In. Welcome!');
								alert('You are being redirected to the home page...');
								// onSignup(data.user, data.token);
							}
						})
						.catch((e) => {
							alert('something went wrong in Login');
						});

					alert('Your Account has been Created...');
				}
				user = {};
			})
			.catch((e) => {
				alert('User already exist');
				console.log(e);
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
				type='submit'
				style={{ marginTop: '15px' }}>
				Submit
			</Button>
		</Form>
	);
};
