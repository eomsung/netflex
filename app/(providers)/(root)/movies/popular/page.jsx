"use client";
import api from "@/api";
import Button from "@/components/Button";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

function PopularMoviesPage() {
  const [page, setPage] = useState(1);

  const { data: movies, isLoading } = useQuery({
    queryFn: () => api.getMovieList("popular", page),
    queryKey: ["movies", { category: "popular", page }],
    initialData: [],
  });

  if (isLoading) return "로딩중 ...";

  const handleClickPrevPage = () => {
    if (page === 1) return;
    setPage((page) => page - 1);
  };
  const handleClickNextPage = () => {
    setPage((page) => page + 1);
  };

  return (
    <div className="mx-auto max-w-screen-sm px-8">
      <h1 className="text-3xl font-bold">인기 있는 영화 목록</h1>

      <div className="flex gap-x-5 mt-10">
        <Button intent="primary" onClick={handleClickPrevPage}>
          이전 페이지
        </Button>
        <Button intent="white" onClick={handleClickNextPage}>
          다음 페이지
        </Button>
      </div>

      <div className="mt-10 font-bold text-red-500">[ {page} 페이지 ]</div>

      <ol
        start={(page - 1) * 20 + 1}
        className="mt-10 text-lg grid gap-y-5 list-decimal list-inside"
      >
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ol>
    </div>
  );
}

export default PopularMoviesPage;
