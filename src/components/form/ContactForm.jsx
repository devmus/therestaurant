import { useContext, useState } from "react";
import { WalletContext } from "../../context/WalletContext";

export const ContactForm = () => {
  const { walletAddress } = useContext(WalletContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    walletData: walletAddress,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="container-contact">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Message:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
