import { useNavigate } from "react-router-dom";

export const ShowBooking = ({ displayBookingConfirmation, loadingScreen, restaurantList }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/thankyou");
  };

  const findRestaurantName = (restaurantId) => {
    const restaurant = restaurantList.find(
      (restaurant) => (restaurant[0].toString()) === (restaurantId),
    );
    return restaurant ? restaurant[1] : "Unknown Restaurant";
  };

  return (
    <>
    {/* <div className="container-contact"> */}
      {loadingScreen && <div>Loading...</div>}
      {displayBookingConfirmation && (
        <div className="container-contact">
          <h2>Your booking has been confirmed!</h2>
          <div>Restaurant: {findRestaurantName(displayBookingConfirmation.restaurantId)}</div>
          <div>Guests: {displayBookingConfirmation.numberOfGuests}</div>
          <div>Your name: {displayBookingConfirmation.name}</div>
          <div>Date: {displayBookingConfirmation.date}</div>
          <div>Time: {displayBookingConfirmation.time.replace(/(\d{2})(\d{2})/, "$1:$2")}</div>
          <button onClick={handleClick}>OK</button>
        </div>
      )}
      {/* </div> */}
    </>
  );
};