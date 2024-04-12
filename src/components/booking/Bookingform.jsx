import React, { useContext, useEffect, useState } from "react";
import { ContractContext } from "../../context/ContractContext";
import {
  createBooking,
  fetchAllBookings,
  getBookingFunc,
} from "../../services/blockchainService";
import { applyBookingFilters } from "../../services/utils";

export const Bookingform = ({
  displayBookingConfirmation,
  loadingScreen,
  booking,
  handleSetBooking,
  restaurantList,
  displayBookingForm,
  setdisplayBookingConfirmation,
  setLoadingScreen,
}) => {
  const [bookings, setBookings] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [filterBookingDate, setFilterBookingDate] = useState([]);
  const [bookings1800, setBookings1800] = useState([]);
  const [bookings2100, setBookings2100] = useState([]);
  const [tablesRemain1800, setTablesRemain1800] = useState(15);
  const [tablesRemain2100, setTablesRemain2100] = useState(15);
  const { readContract, writeContract } = useContext(ContractContext);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!readContract) return;
      const fetchedBookings = await fetchAllBookings(readContract);
      setAllBookings(fetchedBookings);
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    if (booking.restaurantId !== "") {
      const getBookingsFromRestauruntId = async () => {
        try {
          const result = await getBookingFunc(
            parseInt(booking.restaurantId),
            readContract,
          );
          setBookings(result);
        } catch (error) {
          console.error("Failed to fetch bookings:", error);
        }
      };
      getBookingsFromRestauruntId();
    }
  }, [booking]);

  useEffect(() => {
    const filterAllBookings = () => {
      const filterDate = applyBookingFilters(allBookings, bookings, booking);
      setFilterBookingDate(filterDate);
    };
    filterAllBookings();
  }, [bookings]);

  useEffect(() => {
    try {
      const filter1800 = filterBookingDate.filter((item) => item[4] === 1800n);
      setBookings1800(filter1800);
      const filter2100 = filterBookingDate.filter((item) => item[4] === 2100n);
      setBookings2100(filter2100);
    } catch (error) {}
  }, [filterBookingDate]);

  useEffect(() => {
    try {
      const tablesremain1800 = 15 - bookings1800.length;
      setTablesRemain1800(tablesremain1800);
      const tablesremain2100 = 15 - bookings2100.length;
      setTablesRemain2100(tablesremain2100);
    } catch (error) {
      console.error("Failed to count remaining tables:", error);
    }
  }, [bookings1800, bookings2100]);

  const handleCreateBooking = async () => {
    try {
      setLoadingScreen("true");
      await createBooking(booking, writeContract);
      setdisplayBookingConfirmation(booking);
    } catch (error) {
      console.error("Failed to create booking:", error);
    }
  };

  return (
    <>
      {!displayBookingConfirmation && !loadingScreen && displayBookingForm && (
        <div className="form-wrapper">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateBooking();
            }}
          >
            <div className="form-control">
              <label htmlFor="booking-form-restaurantId">Restaurant</label>
              <select
                name="restaurantId"
                id="booking-form-restaurantId"
                onChange={handleSetBooking}
                defaultValue=""
              >
                <option value="" disabled>
                  Choose restaurant
                </option>
                {restaurantList.map((restaurant) => (
                  <option
                    key={restaurant[0].toString()}
                    value={restaurant[0].toString()}
                  >
                    {restaurant[1]}
                  </option>
                ))}
              </select>
            </div>
            {booking.restaurantId !== "" && (
              <>
                <div className="form-control">
                  <label htmlFor="booking-form-date">Date</label>
                  <input
                    type="date"
                    name="date"
                    id="booking-form-date"
                    value={booking.date}
                    onChange={handleSetBooking}
                    required
                  />
                </div>
                {booking.date !== "" && (
                  <>
                    <div className="form-control">
                      <label
                        className="choose-time-wrapper"
                        htmlFor="booking-form-time-1800"
                      >
                        Book 18:00
                        <input
                          type="radio"
                          id="booking-form-time-1800"
                          onClick={(e) => {
                            e.preventDefault();
                            handleSetBooking({
                              target: { name: "time", value: "1800" },
                            });
                          }}
                          className={
                            booking.time === "1800"
                              ? "bookingTime selected"
                              : "bookingTime"
                          }
                          disabled={tablesRemain1800 === 0}
                        />
                        {`${tablesRemain1800} tables remaining with 6 seats at 18:00`}
                      </label>
                    </div>
                    <div className="form-control">
                      <label
                        className="choose-time-wrapper"
                        htmlFor="booking-form-time-2100"
                      >
                        Book 21:00:
                        <input
                          type="radio"
                          id="booking-form-time-2100"
                          onClick={(e) => {
                            e.preventDefault();
                            handleSetBooking({
                              target: { name: "time", value: "2100" },
                            });
                          }}
                          className={
                            booking.time === "2100"
                              ? "bookingTime selected"
                              : "bookingTime"
                          }
                          disabled={tablesRemain2100 === 0}
                        />
                        {`${tablesRemain2100} tables remaining with 6 seats at 21:00`}
                      </label>
                    </div>
                    {booking.time !== "" && (
                      <>
                        <div className="form-control">
                          <label htmlFor="booking-form-numberOfGuests">
                            Number of Guests
                          </label>
                          <input
                            type="number"
                            name="numberOfGuests"
                            id="booking-form-numberOfGuests"
                            value={booking.numberOfGuests}
                            onChange={handleSetBooking}
                            required
                            min="1"
                            max="6"
                            autoComplete="off"
                          />
                        </div>
                        <div className="form-control">
                          <label htmlFor="booking-form-numbername">
                            Your name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="booking-form-numbername"
                            value={booking.name}
                            onChange={handleSetBooking}
                            required
                            autoComplete="off"
                          />
                        </div>
                        <button>Add Booking</button>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </form>
        </div>
      )}
    </>
  );
};
