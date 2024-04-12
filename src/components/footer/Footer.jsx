import { NavLink } from 'react-router-dom';
import signalImg from '../../content/img/signal.png';
import telegramImg from '../../content/img/telegram.png';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <NavLink to={'/therestaurant/'}>Home</NavLink>
        <NavLink to={'/therestaurantbooking'}>Booking</NavLink>
        <NavLink to={'/therestaurant/admin'}>Admin</NavLink>
        <NavLink to={'/therestaurant/contact'}>Contact</NavLink>
        <NavLink to={'/therestaurant/datakeep'}>Privacy Policy</NavLink>
      </div>
      <div className="copyright">
        <p>© 2024 Book Your Table.</p>
      </div>
      <div className="social-links">
        <a
          href=""
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={signalImg}
            alt="Signal"
          />
        </a>
        <a
          href=""
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={telegramImg}
            alt="Telegram"
          />
        </a>
      </div>
    </footer>
  );
};