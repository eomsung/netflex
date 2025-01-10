"use client";
import React, { useState } from "react";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/AuthContext";
import { useModal } from "@/contexts/ModalContext";
import LogInModal from "../../../_components/LogInModal";
import clsx from "clsx";

function MovieCommetns() {
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState([]);
  const [orderByCreatedAt, setOrderByCreatedAt] = useState("desc");
  const { isLoggedIn } = useAuth();
  const modal = useModal();

  const orderedComments = [...comments].sort((aCommnet, bComment) =>
    orderByCreatedAt === "asc"
      ? aCommnet.createAt - bComment.createAt
      : bComment.createAt - aCommnet.createAt
  );

  const handleSubmit = () => {
    if (!isLoggedIn) return modal.open(<LogInModal />);
    if (commentContent === "") return;
    const comment = {
      id: Date.now(),
      author: {
        email: "test@test.com",
      },
      content: commentContent,
      createAt: Date.now(),
    };

    setComments([...comments, comment]);
    setCommentContent("");
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto py-20 px-8">
      <h5 className="text-xl font-bold">감상평 {comments.length}개</h5>
      <form className="mt-5 flex flex-col" onSubmit={(e) => e.preventDefault()}>
        <textarea
          placeholder="이곳에 감상평을 남겨주세요"
          className="w-full rounded-lg text-black resize-none"
          rows={3}
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
        />
        <Button onClick={handleSubmit} intent="white" className="self-end mt-4">
          등록하기
        </Button>
      </form>

      <hr className="my-8" />
      <div className="flex gap-x-4 ">
        <button
          onClick={() => setOrderByCreatedAt("desc")}
          className={clsx({ "font-black": orderByCreatedAt === "desc" })}
        >
          최신순
        </button>
        <button
          onClick={() => setOrderByCreatedAt("asc")}
          className={clsx({ "font-black": orderByCreatedAt === "asc" })}
        >
          오래된순
        </button>
      </div>
      <ol className="grid gap-y-4">
        {orderedComments.map((comment) => (
          <li key={comment.id} className="bg-black/50 p-5 rounded-lg">
            <span className="font-sm font-bold mb-4 inline-block">
              {comment.author.email}
            </span>
            <p>{comment.content}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default MovieCommetns;
