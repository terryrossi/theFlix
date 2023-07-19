import React from 'react';
import { useState, useEffect } from 'react';
import { Navbar, Nav, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { setMovies } from '../../redux/reducers/movies';
import { setUser } from '../../redux/reducers/user';
import { setSelectedMovie } from '../../redux/reducers/selectedMovie';

export const NavigationBar = () => {
	const [expanded, setExpanded] = useState(false);

	const movies = useSelector((state) => state.movies);
	console.log('in navbar, movies : ', movies);

	const selectedMovie = useSelector((state) => state.selectedMovie);
	console.log('in navbar, selectedMovie :  ', selectedMovie);

	const user = useSelector((state) => state.user);
	console.log('in navBar, user : ', user);

	let token = localStorage.getItem('token');
	const userName = user ? user.userName : '';

	console.log('in navbar, user, userName : ', user, userName);

	// console.log('in NavBar user, token: ', user, token);
	dispatch = useDispatch();

	// Logout
	const handleLogout = () => {
		toggleNavbar();
		dispatch(setUser(null));
		dispatch(setSelectedMovie(null));
		dispatch(setMovies([]));
		token = null;
		localStorage.clear();
		console.log('Logged out!!!');
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
					style={{
						color: 'red',
						padding: '0.5rem',
						fontFamily: 'Beaufort for NF',
						fontSize: '2rem',
						fontWeight: 'bold',
					}}>
					TheFLIX
				</Navbar.Brand>
				<Navbar.Toggle
					aria-controls='navbar-nav'
					onClick={toggleNavbar}
					style={{ borderColor: 'red' }}
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
								to={`/users/${encodeURIComponent(userName)}`}
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
