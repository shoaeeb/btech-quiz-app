import React from "react";
import NavBar from "../components/NavBar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen">
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;
