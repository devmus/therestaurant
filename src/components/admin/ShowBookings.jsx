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
  const [editBookingId, setEditBookingId] = useState(null);
  const [editBookingData, setEditBookingData] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!readContract) return;
      const fetchedBookings = await fetchAllBookings(readContract);
      setBookings(fetchedBookings);
    };

    fetchBookings();
  }, [restaurantId, all, readContract, bookings]);

  const handleFilterChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    if (e.target.value === "" || e.target.value === "Show All") {
      setSearchActive(false);
      setFilteredBookings([]);
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

  const handleEdit = (bookingId) => {
    const booking = bookings.find((booking) => booking[0] === bookingId);
    setEditBookingData({
      numberOfGuests: booking[1],
      name: booking[2],
      date: booking[3],
      time: booking[4],
    });
    setEditBookingId(bookingId);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const timeWithoutColon = editBookingData.time.replace(":", "");
    try {
      await editBooking(
        editBookingId,
        editBookingData.numberOfGuests,
        editBookingData.name,
        editBookingData.date,
        timeWithoutColon,
        writeContract,
      );
      window.alert("The booking has been edited.");
      await new Promise((resolve) => setTimeout(resolve, 5000));
      const fetchedBookings = await fetchAllBookings(
        readContract,
        restaurantId,
      );
      setBookings(fetchedBookings);
      setEditBookingId(null);
      setRefresh(!refresh);
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
          onChange={(e) => {
            setFilterType(e.target.value);
            handleFilterChange(e);
          }}
          value={filterType}
        >
          <option value="Show All">Show All</option>
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
        <div>
          {bookingsToRender
            .filter((booking) => booking[2] !== "")
            .sort((a, b) => Number(a[5]) - Number(b[5]))
            .map((booking) =>
              booking[0] === editBookingId ? (
                <form key={booking[0]} onSubmit={handleEditSubmit}>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={editBookingData.numberOfGuests}
                    onChange={(e) =>
                      setEditBookingData({
                        ...editBookingData,
                        numberOfGuests: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    value={editBookingData.name}
                    onChange={(e) =>
                      setEditBookingData({
                        ...editBookingData,
                        name: e.target.value,
                      })
                    }
                  />
                  <input
                    type="date"
                    value={editBookingData.date}
                    onChange={(e) =>
                      setEditBookingData({
                        ...editBookingData,
                        date: e.target.value,
                      })
                    }
                  />
                  <select
                    value={editBookingData.time}
                    onChange={(e) =>
                      setEditBookingData({
                        ...editBookingData,
                        time: e.target.value.replace(":", ""),
                      })
                    }
                  >
                    <option value="1800">18:00</option>
                    <option value="2100">21:00</option>
                  </select>
                  <button type="submit">Submit</button>
                </form>
              ) : (
                <Bookings
                  key={booking[0]}
                  booking={booking}
                  handleEdit={() => handleEdit(booking[0])}
                  handleRemove={handleRemove}
                />
              ),
            )}
        </div>
      </ul>
    </div>
  );
};

ShowBookings.propTypes = {
  restaurantId: PropTypes.number,
  all: PropTypes.bool,
  readContract: PropTypes.object,
};

