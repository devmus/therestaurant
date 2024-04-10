import { Link } from "react-router-dom";

export const DataKeep = () => {
  return (
    <div className="container">
      <h2>Privacy Policy</h2>
      <div className="container-contact">
        <p>
          At Book Your Table, we understand the importance of protecting the
          privacy of our users. This Privacy Policy outlines the types of
          personal information we collect and how it is used.
          <br />
          <br />
          Information
          Collection and Use: <br />
           - When users contact us, they have
          the option to provide their email address. However, we do not require
          or verify the accuracy of this information.
          <br /> <br />
          Information Disclosure:
          <br /> - We do not sell, trade, or disclose any personally
          identifiable information to outside parties unless required by law.
          <br /> <br />
          Data Security:
          <br /> - We take reasonable precautions to protect the
          security of our users&apos;' personal information. However, please be
          aware that no method of transmission over the internet or electronic
          storage is 100% secure and we cannot guarantee absolute security.
          <br /> <br />
          Changes to this Privacy Policy:
          <br /> - We reserve the right to modify this
          Privacy Policy at any time. Any changes will be effective immediately
          upon posting the updated Privacy Policy on our website.
          <br /> <br />
          By using this website, you consent to the terms outlined in this Privacy Policy. If
          you have any questions or concerns regarding our Privacy Policy,
          please <Link to="/contact">contact us</Link>.
          <br /> <br />
          This Privacy Policy was last updated on 12 April 2024.
        </p>
      </div>
    </div>
  );
};
