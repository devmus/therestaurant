import { NavLink } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <div className="content">
        <h1>Book Your Table Today!</h1>
        <p className="quote">Use <span className="web3">Web3</span> to book and experience the city&apos;s most exquisite restaurants.</p>
        <NavLink to="/booking" className="cta-button">Book Now</NavLink>
      </div>
    </div>
  );
};