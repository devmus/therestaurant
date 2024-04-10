import { convertTime } from "../../services/utils";

export function Bookings({ booking, handleEdit, handleRemove }) {
  return (
    <li key={booking[0]}>
      <div className="booking-detail">
        <p>Restaurant ID: {booking[5].toString()}</p>
        <p>Name: {booking[2]}</p>
        <p>Date: {booking[3]}</p>
        <p>Time: {convertTime(booking[4])}</p>
        <p>Number of Guests: {booking[1].toString()}</p>
        <p>Booking ID: {booking[0].toString()}</p>
      </div>
      <div className="booking-actions">
        <button onClick={() => handleEdit(booking[0])}>Edit</button>
        <button onClick={() => handleRemove(booking[0])}>Remove</button>
      </div>
    </li>
  );
}
