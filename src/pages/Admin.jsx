import { useContext, useState, useEffect } from "react";
import { createRestaurant } from "../services/blockchainService.js";
import { ShowRestaurants } from "../components/admin/ShowRestaurants.jsx";
import { ContractContext } from "../context/ContractContext.js";
import { WalletContext } from "../context/WalletContext.js";
import { ShowBookings } from "../components/admin/ShowBookings.jsx";

export const Admin = () => {
  const [newRestaurant, setNewRestaurant] = useState({ name: "" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [admin, setAdmin] = useState({username: "", password: ""});
  const [isLoading] = useState(false);
  const { writeContract } = useContext(ContractContext);
  const { isConnected } = useContext(WalletContext);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn) {
      setLoggedIn(JSON.parse(loggedIn));
    }
  }, []);

  const handleCreateRestaurant = async (event) => {
    event.preventDefault();
    const { name } = newRestaurant;

    try {
      await createRestaurant(name, writeContract);
      alert("Restaurant created successfully");
    } catch (error) {
      console.error("Failed to create restaurant:", error);
    }
  };

  const handleInputChange = (event) => {
    setNewRestaurant({
      ...newRestaurant,
      [event.target.name]: event.target.value,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleLogin = () => {
    if(admin.username === "admin" && admin.password === "123") {
      setLoggedIn(true);
      localStorage.setItem('loggedIn', true);
    } else {
      alert("Wrong username or password!")
    }
  }

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('loggedIn');
  }


  const handleAdmin = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  }

  return (
    <div className="container">
      <h1>Admin</h1>
      {isConnected && loggedIn ? (
        <>
            <button className="button-login" onClick={handleLogout}>Log out</button>          
            <form onSubmit={handleCreateRestaurant}>
            <label>
              <input
                type="text"
                name="name"
                value={newRestaurant.name}
                onChange={handleInputChange}
                placeholder="Restaurant Name"
                required
              />
            </label>
            <button type="submit">Create Restaurant</button>
          </form>
          <ShowRestaurants />
          <div>
            <ShowBookings all={true} restaurantId={newRestaurant.id} />
          </div>
        </>
      ) : null}
      {!isConnected && <p>Connect a wallet to continue.</p>}
      {isConnected && !loggedIn && (
        <>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleLogin()}}>
            <div className="form-control">
              <label htmlFor="username-admin">Username</label>
              <input type="text" id="username-admin" name="username" placeholder="admin" onChange={handleAdmin}/>
            </div>
            <div className="form-control">
              <label htmlFor="password-admin">Password</label>
              <input type="text" id="password-admin" name="password" placeholder="123" onChange={handleAdmin}/>
            </div>
            <button className="button-login" onClick={handleLogin}>Log in</button>
          </form>
        </>
      )}
    </div>
  );
}