import { ethers } from 'ethers';
import { abi } from './config.js';

/**********************************************************************************/
//                     Blockchain Initialization Functions                        //
/**********************************************************************************/

export const requestAccount = async () => {
  try {
    const result = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    return result;
  } catch (error) {
    console.error('Error requesting account:', error);
  }
};

export const walletChecker = (errorMsg) => {
  if (!window.ethereum) {
    errorMsg =
      'Ethers.js: Web3 provider not found. Please install a wallet with Web3 support.';
    console.error(errorMsg);
  } else {
    window.provider = new ethers.BrowserProvider(window.ethereum);
  }
};

export const loadReadContract = async (contractAddress) => {
  if (contractAddress === '') {
    return;
  }

  const restaurantReadContract = new ethers.Contract(
    contractAddress,
    abi,
    window.provider
  );

  return restaurantReadContract;
};

export const loadWriteContract = async (contractAddress) => {
  if (contractAddress === '') {
    return;
  }
  const signer = await provider.getSigner();

  const resturantWriteContract = new ethers.Contract(
    contractAddress,
    abi,
    signer
  );

  return resturantWriteContract;
};

/**********************************************************************************/
//                     Blockchain Service Solidity Functions                      //
/**********************************************************************************/

/**********************************************************************************/
//                     Restaurant Functions                                       //
/**********************************************************************************/

export const createRestaurant = async (restaurantName, writeContract) => {
  if (!writeContract) {
    return;
  }

  try {
    await writeContract.createRestaurant(restaurantName);
  } catch (error) {
    console.error('Error in createRestaurant:', error);
    throw error;
  }
};

export const getRestaurants = async (readContract) => {
  if (!readContract) {
    return [];
  }

  try {
    const restaurantCount = await readContract.restaurantCount();
    const restaurants = [];
    for (let i = 1; i <= restaurantCount; i++) {
      const restaurant = await readContract.restaurants(i);
      restaurants.push(restaurant);
    }
    return restaurants;
  } catch (error) {
    console.error(`Failed to fetch restaurants: ${error}`);
  }
};

/**********************************************************************************/
//                     Booking Functions                                          //
/**********************************************************************************/

export const createBooking = async (booking, writeContract) => {
  try {
    const result = await writeContract.createBooking(
      booking.numberOfGuests,
      booking.name,
      booking.date,
      booking.time,
      booking.restaurantId
    );
    await result.wait();
  } catch (error) {
    console.error('Error creating booking', error);
  }
};

export const editBooking = async (
  bookingId,
  numberOfGuests,
  name,
  date,
  time,
  writeContract
) => {
  try {
    const result = await writeContract.editBooking(
      bookingId,
      numberOfGuests,
      name,
      date,
      time
    );
    await result.wait();
  } catch (error) {
    console.error('Error editing booking:', error);
    throw error;
  }
};

export const fetchAllBookings = async (readContract, restaurantId = '') => {
  const bookings = [];
  if (!readContract) {
    console.error('Read contract is not provided.');
    return bookings;
  }

  try {
    const bookingCount = await readContract.bookingCount();
    for (let i = 1; i <= bookingCount; i++) {
      const booking = await readContract.bookings(i);
      if (!restaurantId || booking.resturantId === restaurantId) {
        bookings.push(booking);
      }
    }
  } catch (error) {
    console.error(`Failed to fetch bookings: ${error}`);
  }

  return bookings;
};

export const removeBooking = async (bookingId, writeContract) => {
  try {
    if (!writeContract) {
      throw new Error('Write contract not initialized');
    }
    const result = await writeContract.removeBooking(bookingId);
    await result.wait();
  } catch (error) {
    console.error('Error removing booking:', error);
    throw error;
  }
};

//

export const getBookingFunc = async (restaurantId, readContract) => {
  if (!readContract) {
    return [];
  }
  try {
    const bookings = await readContract.getBookings(restaurantId);
    return bookings;
  } catch (error) {
    console.error(`Failed to fetch bookings: ${error}`);
  }
};
