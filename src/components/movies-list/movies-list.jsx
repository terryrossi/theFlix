import React from 'react';
import { useSelector } from 'react-redux';
import { MovieCard } from '../movie-card/movie-card';
import { MoviesFilter } from '../movies-filter/movies-filter';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export const MoviesList = () => {
	const movies = useSelector((state) => state.movies.list);
	const filter = useSelector((state) => state.movies.filter)
		.trim()
		.toLowerCase();

	const filteredMovies = movies.filter((movie) => movie.title.toLowerCase().includes(filter));

	return (
		<>
			<Row>
				<MoviesFilter />
			</Row>
			<Row>
				{movies.length === 0 ? (
					<Col>The list is empty!</Col>
				) : (
					filteredMovies.map((movie) => {
						<Col
							key={movie.id}
							lg={3}
							md={4}
							xs={6}>
							<MovieCard
								// key={movie.id}
								movie={movie}
								// onMovieClick={(newSelectedMovie) => {
								//   setSelectedMovie(newSelectedMovie);
								// }}
							/>
						</Col>;
					})
				)}
			</Row>
		</>
	);
};
