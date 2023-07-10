import React from 'react';
import { useState, useEffect } from 'react';
import { Navbar, Nav, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavigationBar = ({ onLogout }) => {
	const [expanded, setExpanded] = useState(false);

	// Check if Logged In
	const userToParse = localStorage.getItem('user') ? localStorage.getItem('user') : null;

	const user = JSON.parse(userToParse);
	const token = localStorage.getItem('token');

	// console.log('in NavBar user, token: ', user, token);

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
						{!token && (
							<Nav.Link
								as={Link}
								to='/login'
								onClick={toggleNavbar}>
								Log In
							</Nav.Link>
						)}
						{!token && (
							<Nav.Link
								as={Link}
								to='/signUp'
								onClick={toggleNavbar}>
								Sign Up
							</Nav.Link>
						)}
						{token && (
							<Nav.Link
								as={Link}
								to={`/users/${encodeURIComponent(user.userName)}`}
								onClick={toggleNavbar}>
								Profile
							</Nav.Link>
						)}

						{token && <Nav.Link onClick={handleLogout}>Logout</Nav.Link>}
					</Nav>
				</Navbar.Collapse>
				{/* </Container> */}
			</Navbar>
		</Row>
	);
};
