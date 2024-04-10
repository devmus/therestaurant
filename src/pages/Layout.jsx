import { Outlet } from "react-router";
import "../App.scss";
import { Navbar } from "../components/header/Navbar";
import { DarkModeProvider } from "../context/DarkModeContext";
import { Footer } from "../components/footer/Footer";

export const Layout = () => {
  return (
    <DarkModeProvider>
      <div>
        <header>
          <Navbar />
        </header>
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </DarkModeProvider>
  );
};
