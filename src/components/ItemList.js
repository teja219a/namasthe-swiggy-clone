import { useDispatch } from "react-redux";
import { IMG_CDN_URL } from "../config";
import { addItem, removeItem } from "./utils/cartSlice";

const ItemList = ({ items }) => {
    //Need access to dispath.
    const dispatch = useDispatch();
    const handleAddItem = (item) => {
        //Dispatch an Action
        dispatch(addItem(item));
    };
    console.log(handleAddItem);
    return (
        <div>
            <div>
                {items.map((item) => (
                    <div
                        key={item?.card?.info?.id}
                        className="p-2 m-2 border-gray-200 border-b-2 text-left flex justify-between gap-x-2"
                    >
                        <div className="w-9/12">
                            <div className="py-2">
                                <span>{item?.card.info?.name}</span>
                                <span>
                                    - ₹
                                    {item?.card.info?.price
                                        ? item?.card.info?.price / 100
                                        : item?.card.info?.defaultPrice / 100}
                                </span>
                            </div>
                            <div>
                                <p className="text-xs ">
                                    {item?.card.info?.description}
                                </p>
                            </div>
                        </div>
                        <div className="w-3/12">
                            <div className="absolute">
                                <button
                                    className="p-2 mx-16 my-16 rounded-lg bg-black text-white shadow-lg "
                                    onClick={() => {
                                        // dispatch an action
                                        handleAddItem(item);
                                    }}
                                >
                                    Add +
                                </button>
                            </div>
                            <img
                                src={IMG_CDN_URL + item?.card?.info?.imageId}
                                className="w-40 p-4 "
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItemList;
