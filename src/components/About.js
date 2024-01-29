import { Outlet } from "react-router-dom";
import UserClass from "./UserClass";
import React from "react";
class About extends React.Component {
    constructor(props) {
        super(props);
        console.log(" Parent Constructor is called");
    }
    async componentDidMount() {
        console.log(" Parent Component Did Mount is called");
    }

    render() {
        console.log("Parent render is called");

        return (
            <div className="m-4 p-4 bg-gray-200 rounded-lg">
                <h1 className="font-bold text-xl">About us</h1>

                <Outlet />
                <UserClass />
            </div>
        );
    }
}
export default About;
