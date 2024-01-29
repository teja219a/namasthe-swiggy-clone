import React, { useContext, useState } from "react";
import Logo from "../assets/img/foodvilla.jpg";
import { Link } from "react-router-dom";
import useOnlineStatus from "./utils/useOnlineStatus";
import UserContext from "./utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState("Login");
    const onlineStatus = useOnlineStatus();
    const { loggedInUser } = useContext(UserContext);
    // console.log(loggedInUser);
    //Subscribing to the store using Selector

    const cartItems = useSelector((store) => store.cart.items);
    console.log(cartItems);
    return (
        <div className="flex justify-between shadow-lg mb-2 bg-pink-100 sm:bg-yellow-50 lg:bg-green-50">
            <div>
                <img className="w-20" alt="logo" src={Logo} />
            </div>
            <div className="flex items-center">
                <ul className="flex p-4 m-4">
                    <li className="px-4">
                        Online Status: {onlineStatus ? "✅" : "🔴"}
                    </li>
                    <li className="px-4">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="px-4">
                        <Link to="/about">About Us</Link>
                    </li>
                    <li className="px-4">
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li className="px-4">
                        <Link to="/grocery">Grocery</Link>
                    </li>
                    <li className="px-4 font-bold text-xl">
                        <Link to="/cart">
                            Cart - ({cartItems.length} items)
                        </Link>
                    </li>
                    <button
                        className="login"
                        onClick={() => {
                            isLoggedIn === "Login"
                                ? setIsLoggedIn("Logout")
                                : setIsLoggedIn("Login");
                        }}
                    >
                        {isLoggedIn}
                    </button>
                    <li className="px-4 font-bold">{loggedInUser}</li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
