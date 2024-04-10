import React, { useCallback, useContext, useEffect, useState } from "react";
import { Bookingform } from "../components/booking/Bookingform";
import { ShowBooking } from "../components/booking/ShowBooking";
import { ChooseRestaurant } from "../components/booking/ChooseRestaurant";
import { getRestaurants, walletChecker } from "../services/blockchainService";
import { ContractContext } from "../context/ContractContext";
import { WalletContext } from "../context/WalletContext";

let errorMsg = "";

walletChecker(errorMsg);

export const Booking = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [booking, setBooking] = useState({
    numberOfGuests: 0,
    name: "",
    date: "",
    time: "",
    restaurantId: "",
  });
  const [ displayBookingConfirmation, setdisplayBookingConfirmation] = useState("");
  const [ displayBookingForm, setdisplayBookingForm] = useState(false);
  const [ loadingScreen, setLoadingScreen] = useState(false);
  const { readContract } = useContext(ContractContext);

  const { isConnected } = useContext(WalletContext);

  useEffect(() => {
    const rest = async () => {
      const result = await getRestaurants(readContract);
      setRestaurantList(result);
    }
    rest();
  }, []);

  useEffect(() => {
    if (displayBookingConfirmation !== null) {
      setLoadingScreen(false);
    }
  }, [displayBookingConfirmation]);

  const handleEnterBooking = async () => {
    const result = await getRestaurants(readContract);
    setRestaurantList(result);
    setdisplayBookingForm(true);
  };

  const handleSetBooking = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const returnBooking = () => {
    setLoadingScreen("true");
    setTimeout(() => {
      setdisplayBookingConfirmation(booking);
    }, 3000);
  };

  

  return (
    <>
      <div className="booking-wrapper container">
      <h1>Booking</h1>
        {isConnected && !displayBookingForm ? (
          <ChooseRestaurant
            displayBookingConfirmation={displayBookingConfirmation}
            handleEnterBooking={handleEnterBooking}
          />
        ) : null}
        {isConnected ? (
          <Bookingform
            displayBookingForm={displayBookingForm}
            booking={booking}
            returnBooking={returnBooking}
            handleSetBooking={handleSetBooking}
            restaurantList={restaurantList}
            displayBookingConfirmation={displayBookingConfirmation}
            loadingScreen={loadingScreen}
          />
        ) : (
          <h2>Please connect the wallet to continue</h2>
        )}
        <ShowBooking
          displayBookingConfirmation={displayBookingConfirmation}
          loadingScreen={loadingScreen}
          restaurantList={restaurantList}
        />
      </div>
    </>
  );
};