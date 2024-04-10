import { useContext, useState } from "react";
import { getRestaurants } from "../../services/blockchainService.js";
import { ContractContext } from "../../context/ContractContext.js";

export const ShowRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [showRestaurants, setShowRestaurants] = useState(false);

  const { readContract } = useContext(ContractContext);

  const handleToggleRestaurants = async (event) => {
    event.preventDefault();
    try {
      const restaurants = await getRestaurants(readContract);
      setRestaurants(restaurants);
    } catch (error) {
      console.error("Failed to fetch restaurants:", error);
    }
    setShowRestaurants(!showRestaurants);
  };

  return (
    <div className="container-contact">
      <div className="booking-detail" style={{ alignItems: 'center'}}>
        <h2 style={{ textAlign: 'center'}}>Restaurants</h2>
        <button onClick={handleToggleRestaurants}>
          {showRestaurants ? "Hide Restaurants" : "Show Restaurants"}
        </button>
        {showRestaurants && (
          <ul>
            {restaurants.map((restaurant, index) => (
              <li key={index}>
                <div className="booking-detail" style={{ textAlign: 'center'}} >
                  <p>ID: {restaurant.id.toString()}, Name: {restaurant.name}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
