import React from "react";

async function MoviePage(props) {
  const params = await props.params;
  const movieId = params.moviesId;
  console.log(movieId);
  return <div>PostPage</div>;
}

export default MoviePage;
