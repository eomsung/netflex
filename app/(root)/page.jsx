import api from "@/api";
import MovieSection from "./_components/MovieSection";

//const [movie,setMovie] = useState([])
// useEffet(()=>{
//  api.getMovieLis("now_playing").then((data)=>setMovie(data))
// })
// CSR 의 경우
//
async function HomePage() {
  const nowPlayingmoviesPromise = api.getMovieList("now_playing");
  const popularmoivesPromise = api.getMovieList("popular");
  const topRatedMoivesPromise = api.getMovieList("top_rated");
  const upcomingMoviesPromise = api.getMovieList("upcoming");

  const [nowPlayingmovies, popularmoives, topRatedMoives, upcomingMovies] =
    await Promise.all([
      nowPlayingmoviesPromise,
      popularmoivesPromise,
      topRatedMoivesPromise,
      upcomingMoviesPromise,
    ]);

  return (
    <main className="py-10">
      <MovieSection
        title="현재 상영중인 영화"
        movies={nowPlayingmovies}
      ></MovieSection>
      <MovieSection
        title="인기 있는 영화"
        movies={popularmoives}
      ></MovieSection>
      <MovieSection
        title="별점이 높은 영화"
        movies={topRatedMoives}
      ></MovieSection>
      <MovieSection
        title="곧 상영되는 영화"
        movies={upcomingMovies}
      ></MovieSection>
    </main>
  );
}

export default HomePage;
