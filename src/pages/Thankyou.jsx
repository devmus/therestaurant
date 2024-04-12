import { useContext, useEffect, useState } from 'react';
import { ContractContext } from '../context/ContractContext';
import { Link } from 'react-router-dom';

export const Thankyou = () => {

  const { readContract } = useContext(ContractContext)

  const [ allBookings, setAllBookings] = useState([]);
  const [ currentId, setCurrentId] = useState(0)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (readContract) {
          const bookingCount = await readContract.bookingCount();
          const fetchedBookings = [];
          for (let i = 1; i <= bookingCount; i++) {
            const booking = await readContract.bookings(i);
            fetchedBookings.push(booking);
          }
          console.log(2);
          setAllBookings(fetchedBookings);
        }
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      }
    };

    fetchBookings();
  }, [])

  useEffect(() => {
    setCurrentId(allBookings.length - 1)
  }, [allBookings])

  return (
    <div className="container">
      <div>Thank you for your booking!</div>
      <div>If you need to cancel or change your booking please contact us and provide us with your booking ID.</div>
      {currentId >0 &&
      <div>Your booking ID: {allBookings[currentId][0].toString()}</div>
      }
      <Link to="/contact">Contact us</Link>
    </div>
  )
}
