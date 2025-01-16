"use client";
import api from "@/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Genre from "./Genre";
import Rating from "./Rating";

function MoviesInfo({ initialData, movieId }) {
  const { data: movie } = useQuery({
    queryFn: () => api.getMovie(movieId),
    queryKey: ["movie", { movieId }],
    initialData,
    // staleTime
  });
  const rating = Number(movie.vote_average.toFixed(2));
  return (
    <div>
      {/* 제목 */}
      <h1 className="text-4xl font-bold mb-8">{movie.title}</h1>
      {/* 별점 */}
      <div className="mb-4">
        <Rating rating={rating} />
      </div>
      {/* 장르 */}
      <ul className="flex gap-x-2.5 mb-4">
        {movie.genres.map((genre, index) => (
          <li key={index}>
            <Genre genre={genre} />
          </li>
        ))}
      </ul>
      {/* 스토리 개괄 */}
      <p>{movie.overview}</p>
    </div>
  );
}

export default MoviesInfo;
