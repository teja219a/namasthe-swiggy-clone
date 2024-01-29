import { useEffect, useState } from "react";

const useOnlineStatus = () => {
    const [onlineStatus, setOnlineStaus] = useState(true);
    // check if online
    useEffect(() => {
        window.addEventListener("offline", () => {
            setOnlineStaus(false);
        });
    });
    useEffect(() => {
        window.addEventListener("online", () => {
            setOnlineStaus(true);
        });
    });
    //return onlineStatus
    return onlineStatus;
};
export default useOnlineStatus;
