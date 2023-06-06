import { MainView } from '../main-view/main-view';
export const MovieView = ({ movie, onBackClick }) => {
	return (
		<div class='cards'>
			<div class='card'>
				<img
					alt='Movie'
					src={movie.image}
				/>
			</div>
			<div>
				<h1>
					Title:
					{movie.title}
				</h1>
				<h2>
					Actor:
					{movie.actor}
				</h2>
				<button onClick={onBackClick}>Back</button>
			</div>
			<div></div>

			<div></div>
		</div>
	);
};
