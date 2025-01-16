import api from "@/api";
import MovieSection from "./_components/MovieSection";

//const [movie,setMovie] = useState([])
// useEffet(()=>{
//  api.getMovieLis("now_playing").then((data)=>setMovie(data))
//
// })
// CSR 의 경우
//
async function HomePage() {
  // const [
  //   { data: nowPlayingMovies },
  //   { data: popularmoives },
  //   { data: topRatedMoives },
  //   { data: upcomingMovies },
  // ] = useQueries(
  //   ["now_playing", "popular", "top_rate", "upcoming"].map((category) => ({
  //     queryFn: () => api.getMovieList(category),
  //     queryKey: ["movies", category],
  //     initialData: [],
  //   }))
  // );

  // const { data: nowPlayingMovies = [] } = useQuery({
  //   queryFn: () => api.getMovieList("now_playing"),
  //   queryKey: ["movies", { category: "now_palying" }],
  // });
  // const { data: popularmoives = [] } = useQuery({
  //   queryFn: () => api.getMovieList("popular"),
  //   queryKey: ["movies", { category: "popular" }],
  // });
  // const { data: topRatedMoives = [] } = useQuery({
  //   queryFn: () => api.getMovieList("top_rated"),
  //   queryKey: ["movies", { category: "top_rated" }],
  // });
  // const { data: upcomingMovies = [] } = useQuery({
  //   queryFn: () => api.getMovieList("upcoming"),
  //   queryKey: ["movies", { category: "upcoming" }],
  // });

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
        initialData={nowPlayingmovies.results}
        category="now_playing"
      ></MovieSection>
      <MovieSection
        title="인기 있는 영화"
        initialData={popularmoives.results}
        category="popular"
      ></MovieSection>
      <MovieSection
        title="별점이 높은 영화"
        initialData={topRatedMoives.results}
        category="top_rated"
      ></MovieSection>
      <MovieSection
        title="곧 상영되는 영화"
        initialData={upcomingMovies.results}
        category="upcoming"
      ></MovieSection>
    </main>
  );
}

export default HomePage;
