"use client";

import api, { localClient } from "@/api";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn && pathname === "/auth/sign-up") router.replace("/");
  }, [isLoggedIn, pathname]);

  useEffect(() => {
    async function initializeLogInStatus() {
      // 1.로컬스토리지에 로그인 상태라는 단서를 찾기

      try {
        const prevRefreshToken = localStorage.getItem("refreshToken");
        // 2. 로그인 상태라는 단서가 있으면, 서버에 토큰을 요청
        if (!prevRefreshToken) {
          return;
        }
        await api.refreshToken(prevRefreshToken);
        setIsLoggedIn(true);
      } catch {
        localStorage.removeItem("refresh-token");
      } finally {
        setIsAuthInitialized(true);
      }

      // 3. 토큰을 받아와서 헤더를 설정하고 isLoggedIn ture로 변경
    }
    initializeLogInStatus();
  }, []);

  const logIn = () => setIsLoggedIn(true);
  const logOut = () => {
    setIsLoggedIn(false);
    // 1.apu의 header에서 accessToken 제거
    localClient.defaults.headers["Authorization"] = "";
    // 2. localStorage에서 제거
    localStorage.removeItem("refreshToken");
  };

  const value = {
    isAuthInitialized,
    isLoggedIn,
    logIn,
    logOut,
  };

  // 로그인을 했는데(useEffect) 회원가입 페이지라면(usePathname), 홈페이지로 이동시키기(useRouter)

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 일반적으로 토큰 방식의 인증을 사용할 때에는 토큰을 두 개 사용한다. 하나는 accessToken: 매 요청에 실어서 보냄, 유효기간이 매우 짧다 .
//  하나는 refreshToken : asssToken을 다시 받아야 할때만 보낸다. 갱신을 위한 토큰

// 로그인을 할 때에 , 서버에서는 두 개의 토큰을 모두 발급해준다.
// 브라우저는 두개의 토큰을 가지고 있다가 accessToken이 만료되면 refresh로 다시발급
