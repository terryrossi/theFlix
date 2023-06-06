import { MainView } from "../main-view/main-view"; export const MovieView = ({ movie, onBackClick })
=> { return (
<div>
	<div>
		<img
			alt="Movie"
			src="{movie.image}" />
	</div>
	<div>
		<span>Title: </span>
		<span>{movie.title}</span>
	</div>
	<div>
		<span>Author: </span>
		<span>{movie.author}</span>
	</div>
	<div>
		<button onClick="{onBackClick}">Back</button>
	</div>
</div>
); };
