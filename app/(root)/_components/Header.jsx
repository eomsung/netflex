import Link from "next/link";
import React from "react";
import Logo from "@/assets/svg/logo.svg";
import Image from "next/image";
function Header() {
  return (
    <header className="h-20 px-8 flex items-center justify-between">
      {/* 로고 */}
      <Link href="/" className="text-red-600 font-bold text-3xl">
        <Image
          src={Logo.src}
          width={120}
          height={33}
          alt="netflix-log"
          sizes="100%"
        />
      </Link>

      {/* 로그인 버튼 등 */}
      <div>
        <button className="font-bold">로그인</button>
      </div>
    </header>
  );
}

export default Header;
