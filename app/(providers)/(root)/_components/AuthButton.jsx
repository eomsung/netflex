"use client";
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useModal } from "@/contexts/ModalContext";
import Modal from "@/components/Modal";
import LogInModal from "./LogInModal";
function AuthButton() {
  const { isLoggedIn, logIn, logOut } = useAuth();
  const modal = useModal();
  const handleClickLogIn = () => {
    modal.open(<LogInModal />);
  };

  if (isLoggedIn) {
    return (
      <button onClick={logOut} className="font-bold">
        로그아웃
      </button>
    );
  }

  return (
    <div>
      <button onClick={handleClickLogIn} className="font-bold">
        로그인
      </button>
    </div>
  );
}

export default AuthButton;
