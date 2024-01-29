import { useEffect, useState, useContext } from "react";
import { restaurantList } from "../config";
import RestaurantCard, { withPromtedLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "./utils/useOnlineStatus";
import UserContext from "./utils/UserContext";

//Filter the restaurant list used by the input data from search bar
function filterData(searchTxt, allRestaurants) {
    console.log(allRestaurants);
    const filterData = allRestaurants.filter((restaurant) =>
        restaurant?.info?.name?.toLowerCase().includes(searchTxt.toLowerCase())
    );
    return filterData;
}

const Body = () => {
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestarants] = useState([]);
    const [searchTxt, setSearchTxt] = useState("");

    const RestaurantCardPromoted = withPromtedLabel(RestaurantCard);
    console.log(allRestaurants)

    useEffect(() => {
        getRestaurants();
    }, []);

    async function getRestaurants() {
        // const data = await fetch(
        //     "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.5912716&lng=73.73890899999999&page_type=DESKTOP_WEB_LISTING"
        // );
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.5912716&lng=73.73890899999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );
        const json = await data.json();
        // console.log(json);
        // use optional chaining
        setAllRestaurants(
            json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
                ?.restaurants
        );
        setFilteredRestarants(
            json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
                ?.restaurants
        );
    }

    //Conditional Rendering
    //If restaurant is empty => Shimmer UI
    //If restaurant has data => Actual data UI
    // Avoid rendering component by using optional chaining or by Early return
    //not render component (Early return)
    // console.log(allRestaurants, "All restaurants");
    console.log(!allRestaurants)
    if (!allRestaurants) return null;
    const onlineStatus = useOnlineStatus();
    if (onlineStatus === false)
        return <h1>You are Offline. Please check yout network</h1>;
    const { loggedInUser, setUserName } = useContext(UserContext);
    return allRestaurants?.length === 0 ? (
        <Shimmer />
    ) : (
        <>
            <div className="flex">
                <div className="search m-4 p-4">
                    <input
                        type="text"
                        className="border border-solid border-black p-1"
                        placeholder="search"
                        value={searchTxt}
                        onChange={(e) => {
                            setSearchTxt(e.target.value);
                        }}
                    />
                    <button
                        className="px-4 py-2 bg-green-100 m-4 rounded-lg"
                        onClick={() => {
                            //need to filter the data
                            const data = filterData(searchTxt, allRestaurants);
                            //update the state- restuarants
                            setFilteredRestarants(data);
                        }}
                    >
                        Search
                    </button>
                </div>
                <div className="search m-4 p-4 flex items-center">
                    <button
                        className="px-4 py-2 bg-gray-100 rounded-lg"
                        onClick={() => {
                            const filteredList = allRestaurants.filter(
                                (restaurant) => {
                                    return restaurant.info.avgRating > 4;
                                }
                            );
                            // console.log(filteredList, "Show filteres list");
                            setFilteredRestarants(filteredList);
                        }}
                    >
                        Top Rated Restaurants
                    </button>
                </div>
                <div className="m-4 p-4 flex items-center">
                    <label>UserName: </label>
                    <input
                        className="border border-black p-2"
                        value={loggedInUser}
                        onChange={(e) => {
                            return setUserName(e.target.value);
                        }}
                    />
                </div>
            </div>
            {filteredRestaurants?.length === 0 ? (
                <h1>No Restaurants Found!!1</h1>
            ) : (
                <div className="flex flex-wrap">
                    {filteredRestaurants?.map((restaurant) => {
                        return (
                            <Link
                                to={"/restaurant/" + restaurant?.info?.id}
                                key={restaurant?.info?.id}
                            >
                                {/* if the restaurant is promoted then add a promoted label to it */}

                                {restaurant.info.aggregatedDiscountInfoV3 ? (
                                    <RestaurantCardPromoted
                                        resData={restaurant}
                                    />
                                ) : (
                                    <RestaurantCard resData={restaurant} />
                                )}
                            </Link>
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default Body;
