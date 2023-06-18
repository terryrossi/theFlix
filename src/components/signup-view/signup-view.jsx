import { useState } from 'react';

export const SignupView = () => {
	const [userName, setUserName] = useState(null);
	const [password, setPassword] = useState(null);
	const [email, setEmail] = useState(null);
	const [birthDate, setBirthDate] = useState(null);
	const [firstName, setFirstName] = useState(null);
	const [lastName, setLastName] = useState(null);

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
		<form onSubmit={handleSubmit}>
			<label>
				FirstName:{' '}
				<input
					type='text'
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					required
				/>
			</label>
			<label>
				LastName:
				<input
					type='text'
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					required
				/>
			</label>
			<label>
				Email:{' '}
				<input
					type='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</label>
			<label>
				BirthDate:{' '}
				<input
					type='date'
					value={birthDate}
					onChange={(e) => setBirthDate(e.target.value)}
				/>
			</label>
			<label>
				UserName:{' '}
				<input
					type='text'
					value={userName}
					minLength={5}
					onChange={(e) => setUserName(e.target.value)}
					required
				/>
			</label>
			<label>
				Password:
				<input
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</label>
			<button type='submit'>Submit</button>
		</form>
	);
};
