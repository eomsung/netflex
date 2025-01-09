import React from "react";
import Header from "./_components/Header";
function RootLayout({ children }) {
  return (
    <div className=" min-h-screen text-white">
      <Header></Header>
      {children}
    </div>
  );
}

export default RootLayout;
