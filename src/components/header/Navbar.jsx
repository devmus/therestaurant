import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { WalletContext } from "../../context/WalletContext";
import { DarkModeContext } from "../../context/DarkModeContext";
import logo from "../../content/img/logo.png";
import { ChainSwitcher } from "./ChainSwitcher";

export const Navbar = () => {
  const { walletAddress, isConnected, connectWallet, disconnectWallet } =
    useContext(WalletContext);
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <nav>
        <div
          id="menu-icon"
          onClick={toggleMenu}
          className={isOpen ? "open" : ""}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li>
            <NavLink to={"/"}>
              <img
                src={logo}
                alt="Logo"
                className="logo"
                onClick={() => setIsOpen(false)}
              />
            </NavLink>
          </li>
          <li>
            <NavLink to={"/"} onClick={toggleMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/booking"} onClick={toggleMenu}>
              Booking
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin"} onClick={toggleMenu}>
              Admin
            </NavLink>
          </li>
          <li>
            <NavLink to={"/contact"} onClick={toggleMenu}>
              Contact
            </NavLink>
          </li>
          <li className="nav-extra">
            <div className="toggle-switch">
              <label>
                <input
                  type="checkbox"
                  checked={isDarkMode}
                  onChange={toggleDarkMode}
                />
                <span className="slider"></span>
              </label>
            </div>
          </li>
          <li className="nav-extra">
            <div className="nav-wallet-button">
              <button
                className="connect-wallet-button"
                onClick={!isConnected ? connectWallet : disconnectWallet}
              >
                {!isConnected ? "Connect Wallet" : "Connected ✔"}
              </button>
              {/* <span>{walletAddress}</span> */}
              <ChainSwitcher />
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};
