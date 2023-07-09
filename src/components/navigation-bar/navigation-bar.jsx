import React from 'react';
import { useState, useEffect } from 'react';
import { Navbar, Nav, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { MainView } from '../main-view/main-view';

export const NavigationBar = ({ onLogout }) => {
	// const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);

	const storedUser = JSON.parse(localStorage.getItem('user'));
	setUser(storedUser);
	const storedToken = localStorage.getItem('token');
	setToken(storedToken);
	console.log('in navigationBar storedUser : ', storedUser);
	const [expanded, setExpanded] = useState(false);

	// Check Logged In?
	// useEffect(() => {
	// Check if there is a logged-in user in localStorage
	// const storedUser = JSON.parse(localStorage.getItem('user'));
	// const storedUser = localStorage.getItem('user');
	// console.log(storedUser);
	// if (storedUser) {
	// 	const parsedUser = JSON.parse(storedUser);
	// setUser(storedUser);
	// }
	// 	const storedToken = localStorage.getItem('token');
	// 	if (storedToken) {
	// 		setToken(storedToken);
	// 	}
	// 	console.log('in NavBar useEffect. storedUser, token? ', storedUser, storedToken);
	// }, []);

	useEffect(() => {
		if (!storedToken) {
			return;
		}
		console.log('in navigationBar storedUser : ', storedUser);
		console.log('in navigationBar userName : ', storedUser.userName);
		console.log('in navigationBar token : ', storedToken);
	}, []);
	// Logout
	const handleLogout = () => {
		toggleNavbar();
		onLogout();
	};

	// Toggle NavBar
	const toggleNavbar = () => {
		setExpanded(!expanded);
	};

	return (
		<Row>
			<Navbar
				bg='dark'
				variant='dark'
				expand='lg'
				expanded={expanded}
				fixed='top'>
				{/* <Container> */}
				<Navbar.Brand
					href='#'
					style={{ color: 'red', padding: '0.5rem' }}>
					TheFLIX
				</Navbar.Brand>
				<Navbar.Toggle
					aria-controls='navbar-nav'
					onClick={toggleNavbar}
				/>
				<Navbar.Collapse id='navbar-nav'>
					<Nav className='ml-auto'>
						<Nav.Link
							as={Link}
							to='/'
							onClick={toggleNavbar}>
							Home
						</Nav.Link>
						<Nav.Link
							as={Link}
							to='/login'
							onClick={toggleNavbar}>
							Log In
						</Nav.Link>
						<Nav.Link
							as={Link}
							to='/signUp'
							onClick={toggleNavbar}>
							Sign Up
						</Nav.Link>
						{token && (
							<Nav.Link
								as={Link}
								to={`/users/${encodeURIComponent(storedUser.userName)}`}
								onClick={toggleNavbar}>
								Profile
							</Nav.Link>
						)}

						<Nav.Link onClick={handleLogout}>Logout</Nav.Link>
					</Nav>
				</Navbar.Collapse>
				{/* </Container> */}
			</Navbar>
		</Row>
	);
};
