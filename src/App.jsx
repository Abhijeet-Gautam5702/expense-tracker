import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer, Container } from "./components";

function App() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-between items-center">
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
