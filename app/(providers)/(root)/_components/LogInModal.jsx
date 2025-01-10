"use clinet";
import api from "@/api";
import Modal from "@/components/Modal";
import { useAuth } from "@/contexts/AuthContext";
import { useModal } from "@/contexts/ModalContext";
import React, { useEffect, useState } from "react";

function LogInModal() {
  const { logIn } = useAuth();

  const modal = useModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [email, password]);

  const handleClickLogIn = async () => {
    const dto = { email, password };

    const isLoginSuccess = await api.logIn(dto);
    if (isLoginSuccess) {
      logIn();
      modal.close();
    } else {
      setError("이메일 또는 비밀번호가 잘못되었습니다");
    }
  };

  return (
    <Modal>
      <form onSubmit={(e) => e.preventDefault()}>
        <h2 className="text-center font-bold text-2xl mb-8">로그인하기</h2>
        <input
          type="email"
          className="border border-gray-400 px-5 py-2.5 rounded-lg w-full"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="border border-gray-400 px-5 py-2.5 rounded-lg w-full mt-2"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="test-sm text-red-500">{error}</p>}

        <button
          onClick={handleClickLogIn}
          className="bg-red-600 w-full py-2.5 rounded-lg text-white font-semibold mt-5"
        >
          로그인
        </button>
      </form>
    </Modal>
  );
}

export default LogInModal;
