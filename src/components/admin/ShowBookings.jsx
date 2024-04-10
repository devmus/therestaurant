import PropTypes from "prop-types";
import { useState, useEffect, useContext } from "react";
import {
  editBooking,
  removeBooking,
  fetchAllBookings,
} from "../../services/blockchainService.js";
import { ContractContext } from "../../context/ContractContext.js";
import { applyAdminFilters } from "../../services/utils.js";
import { Bookings } from "./Bookings.jsx";

export const ShowBookings = ({ restaurantId, all }) => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const { readContract, writeContract } = useContext(ContractContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [filterType, setFilterType] = useState("date");

  useEffect(() => {
    const fetchBookings = async () => {
      const fetchedBookings = await fetchAllBookings(readContract);
      setBookings(fetchedBookings);
    };

    fetchBookings();
  }, [restaurantId, all, readContract]);

  const handleFilterChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setSearchActive(false);
    }
  };

  const handleApplyFilter = () => {
    const filteredBookings = applyAdminFilters(
      bookings,
      filterType,
      searchTerm,
    );
    setFilteredBookings(filteredBookings);
    setSearchActive(true);
  };

  const handleEdit = async (bookingId) => {
    const numberOfGuests = prompt("Enter the updated number of guests");
    const name = prompt("Enter the updated name");
    const date = prompt("Enter the updated date");
    const time = prompt("Enter the updated time");
    try {
      await editBooking(
        bookingId,
        numberOfGuests,
        name,
        date,
        time,
        writeContract,
      );
      await new Promise((resolve) => setTimeout(resolve, 5000));
      const fetchedBookings = await fetchAllBookings(
        readContract,
        restaurantId,
      );
      setBookings(
        fetchedBookings.filter((booking) => booking[0] !== bookingId),
      );
      window.alert("The booking has been edited.");
    } catch (error) {
      console.error("Failed to edit booking:", error);
    }
  };

  const handleRemove = async (bookingId) => {
    const confirmRemove = window.confirm(
      "Are you sure you want to remove this booking?",
    );
    if (confirmRemove) {
      try {
        await removeBooking(bookingId, writeContract);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        const fetchedBookings = await fetchAllBookings(
          readContract,
          restaurantId,
        );
        setBookings(fetchedBookings);
        window.alert("The booking has been removed.");
      } catch (error) {
        console.error("Failed to remove booking:", error);
      }
    }
  };

  const bookingsToRender = searchActive ? filteredBookings : bookings;

  return (
    <div className="container-contact">
      <h2>Bookings</h2>
      <br />
      <div>
        <select
          onChange={(e) => setFilterType(e.target.value)}
          value={filterType}
        >
          <option value="date">Date</option>
          <option value="time">Time</option>
          <option value="name">Name</option>
          <option value="BookingId">Booking ID</option>
        </select>
        {filterType === "date" && (
          <input
            type="date"
            name="date"
            id="date"
            value={searchTerm}
            onChange={handleFilterChange}
          />
        )}
        {(filterType === "name" || filterType === "BookingId") && (
          <input
            type="text"
            placeholder="Enter search term"
            value={searchTerm}
            onChange={handleFilterChange}
          />
        )}
        {filterType === "time" && (
          <select
            name="time"
            id="time"
            value={searchTerm}
            onChange={handleFilterChange}
          >
            <option value="18:00">18:00</option>
            <option value="21:00">21:00</option>
          </select>
        )}
        <button onClick={handleApplyFilter}>Filtrera</button>
      </div>
      <ul>
        {bookingsToRender
          .sort((a, b) => Number(a[5]) - Number(b[5]))
          .map((booking) => (
            <Bookings
              key={booking[0]}
              booking={booking}
              handleEdit={handleEdit}
              handleRemove={handleRemove}
            />
          ))}
      </ul>
    </div>
  );
};

ShowBookings.propTypes = {
  restaurantId: PropTypes.number,
  all: PropTypes.bool,
  readContract: PropTypes.object,
};
