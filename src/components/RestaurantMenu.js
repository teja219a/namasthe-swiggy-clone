import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "./utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";
const RestaurantMenu = () => {
    //Controlling state variable with the index
    const [showIndex, setShowIndex] = useState(0);

    const { resId } = useParams();

    const resInfo = useRestaurantMenu(resId);
    if (resInfo === null) return <Shimmer />;
    const { name, cuisines, costForTwoMessage, cloudinaryImageId } =
        resInfo?.cards?.[0]?.card?.card?.info;

    const { itemCards } =
        resInfo?.cards?.[2].groupedCard?.cardGroupMap?.REGULAR?.cards?.[2]?.card
            ?.card;
    // console.log(
    //     resInfo?.cards?.[2].groupedCard?.cardGroupMap?.REGULAR?.cards,
    //     "item cards"
    // );
    const categories =
        resInfo?.cards?.[2].groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
            (c) =>
                c.card?.card?.["@type"] ===
                "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        );
    // console.log(categories, "categories");
    return (
        <div className="text-center ">
            <h1 className="font-bold my-6 text-2xl">{name}</h1>
            <p className="font-bold text-lg">
                {cuisines.join(",")} - {costForTwoMessage}
            </p>
            {/* Categories accordions */}
            {categories.map((category, index) => (
                <RestaurantCategory
                    key={category?.card?.card.title}
                    data={category?.card?.card}
                    showItems={index === showIndex ? true : false}
                    setShowIndex={() => setShowIndex(index)}
                />
            ))}
        </div>
    );
};
export default RestaurantMenu;
