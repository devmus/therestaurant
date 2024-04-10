import { useContext } from 'react';
import { ContactForm } from '../components/form/ContactForm';
import { aboutUs, contactData } from '../data/contactData';
import { WalletContext } from '../context/WalletContext';
import bitcoinLogo from '../content/img/bitcoin-logo.png';
import moneroLogo from '../content/img/monero-logo.png';
import ethereumLogo from '../content/img/ethereum-logo.png';

export const Contact = () => {
  const { isConnected } = useContext(WalletContext);

  return (
    <div className="container">
      <h1>Contact</h1>
      <div className="container-contact">
        <p>Address: {contactData.address}</p>
        <p>Stad: {contactData.city}</p>
        <p>Postnummer: {contactData.zip}</p>
        <p>Telefon nr: {contactData.phone}</p>
        <p>Email: {contactData.email}</p>
        <p>Opening hours: {contactData.hours}</p>
      </div>

      {isConnected ? (
        <ContactForm />
      ) : (
        <p>Connect wallet if you want to send a message</p>
      )}

      <div className="container-contact about-us-section">
        <h2>About us</h2>
        <br />
        <p>{aboutUs.description}</p>
        <br />
        <p>All our affiliated restaurants accept the following crypto's: {aboutUs.Currency.join(', ')}</p>
        <br />
        <div className="crypto-logos">
          <img
            src={bitcoinLogo}
            alt="Bitcoin Logo"
          />
          <img
            src={ethereumLogo}
            alt="Ethereum Logo"
          />
          <img
            src={moneroLogo}
            alt="Monero Logo"
          />
        </div>
      </div>
    </div>
  );
};
