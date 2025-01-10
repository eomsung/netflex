import React from "react";
import Image from "next/image";
import Link from "next/link";
function MovieCard({ movie }) {
  //   console.log(movie);
  return (
    <Link href={`movies/${movie.id}`}>
      <article>
        <div className="relative w-96 aspect-video">
          <Image
            alt={movie.title}
            fill
            src={"https://image.tmdb.org/t/p/w500" + movie.backdrop_path}
            className="object-cover"
            sizes="100%"
          />
        </div>

        <h6 className="mt-2.5 text-2xl">{movie.title}</h6>
      </article>
    </Link>
  );
}

export default MovieCard;
