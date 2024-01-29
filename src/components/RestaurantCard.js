import { IMG_CDN_URL } from "../config";
const RestaurantCard = (props) => {
    // console.log(props, "Props");
    const { resData } = props;

    const {
        name,
        cuisines,
        cloudinaryImageId,
        sla,
        avgRatingString,
        areaName,
    } = resData?.info;

    return (
        <div className="m-4 py-1 p-4 w-[300px] h-[400px] rounded-lg bg-gray-100 hover:bg-gray-200">
            <img className="rounded-lg" src={IMG_CDN_URL + cloudinaryImageId} />
            <h2 className="font-bold py-4 text-xl"> {name}</h2>
            <h3 className="break-words">{cuisines.join(", ")} </h3>
            <h3 className="text-lg">{avgRatingString} Stars</h3>
            <h3 className="text-lg">{areaName}</h3>
            <h3 className="text-lg">{sla.slaString}</h3>
        </div>
    );
};

// Higher Order Component

// input - RestaurantCard => RestaurantCardPromoted

export const withPromtedLabel = (RestaurantCard) => {
    return (props) => {
        const { resData } = props;
        const header = resData?.info?.aggregatedDiscountInfoV3?.header;
        const subHeader = resData?.info?.aggregatedDiscountInfoV3?.subHeader;
        return (
            <div className="relative">
                <label className="absolute top-[38%] px-5 py-1 w-[268] text-white font-extrabold ml-8  text-xl bg-gradient-to-b from-transparent to-neutral-900">
                    {header} {subHeader}
                </label>
                <RestaurantCard {...props} />
            </div>
        );
    };
};
export default RestaurantCard;
