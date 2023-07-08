import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

export const ProfileView = ({ user }) => {
	const { userName } = useParams();
	// const [user, setUser] = useState(null);
	const [email, setEmail] = useState('');
	// const [birthDate, setBirthDate] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	const storedUser = JSON.parse(localStorage.getItem('user'));
	const storedToken = localStorage.getItem('token');
	const token = storedToken ? storedToken : '';
	console.log('user in profile: ', storedUser);
	useEffect(() => {
		if (!token) {
			return;
		}
		console.log('userName : ', userName);
		// 	fetch(`https://theflix-api.herokuapp.com/users/${userName}`, {
		// 		headers: { Authorization: `Bearer ${token}` },
		// 	})
		// 		.then((response) => response.json())
		// 		.then((data) => {
		// 			console.log('user from api: data', data);
		// setUser(data);
		setFirstName(storedUser.firstName);
		setLastName(storedUser.lastName);
		setEmail(storedUser.email);
		// 		})
		// 		.catch((error) => {
		// 			console.error('Error fetching user data:', error);
		// 		});
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
		// setUser(updatedUser);

		// Update user data via API
		console.log('before fetch PATH data, user, token : ', updatedUser, token);
		console.log(updatedUser.password);
		fetch(`https://theflix-api.herokuapp.com/users/`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(updatedUser),
		})
			.then((response) => response.json())
			.then((data) => {
				alert('Your Account has been Modified');
				console.log('in profile. response data : ', data);
				// user = {};
			})
			.catch((e) => {
				// alert('User already exist');
				console.log('error occured during modification of user : ', e);
			});
	};
	// if (!user) {
	// 	return <div>Loading...</div>;
	// }

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
			{/* <Form.Group controlId='formBirthDate'>
				<Form.Label>BirthDate:</Form.Label>
				<Form.Control
					type='date'
					value={birthDate}
					onChange={(e) => setBirthDate(e.target.value)}
					required
				/>
			</Form.Group> */}
			{/* <Form.Group controlId='formNewUserName'>
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
			</Form.Group> */}

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
