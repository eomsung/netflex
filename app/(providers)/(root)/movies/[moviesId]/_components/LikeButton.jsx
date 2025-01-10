"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useModal } from "@/contexts/ModalContext";
import React, { useState } from "react";
import LogInModal from "../../../_components/LogInModal";
import clsx from "clsx";
import Button from "@/components/Button";
export function LikeButton() {
  const { isLoggedIn } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const label = isLiked ? "찜풀기" : "찜하기";
  const modal = useModal();

  const handleClick = () => {
    if (!isLoggedIn) return modal.open(<LogInModal />);
    if (isLiked) {
      setIsLiked(false);
    } else {
      setIsLiked(true);
    }
  };

  return (
    <Button
      onClick={handleClick}
      intent={isLiked ? "white" : "primary"}
      size="lg"
      className="w-full mt-4"
    >
      {label}
    </Button>
  );
}

export default LikeButton;
