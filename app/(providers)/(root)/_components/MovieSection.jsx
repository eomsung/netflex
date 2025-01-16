"use client";
import React from "react";
import MovieCard from "./MovieCard";
import { kku, oreaorea } from "@/assets/fonts";
import { useQuery } from "@tanstack/react-query";
import api from "@/api";

function MovieSection({ title, category, initialData }) {
  const { data: movies } = useQuery({
    queryFn: () => api.getMovieList(category).then((data) => data.results),
    queryKey: ["movies", { category }],
    initialData,
  });

  return (
    <div>
      <section className="[&+&]:mt-20">
        <h2 className={`px-8 text-2xl font-bold mb-6 `}>{title}</h2>

        <ul className="px-8 flex gap-x-5 overflow-x-scroll scrollbar-hide">
          {movies.map((movie) => (
            <li key={movie.id} className="shrink-0">
              <MovieCard movie={movie}></MovieCard>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default MovieSection;
