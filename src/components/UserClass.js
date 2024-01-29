import React from "react";
import UserContext from "./utils/UserContext";
class UserClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                name: "Dummy Name",
                location: "Dummy Location",
            },
        };
    }
    async componentDidMount() {
        const data = await fetch("https://api.github.com/users/akshaymarch7");
        const json = await data.json();
        console.log(json);

        this.setState({
            userInfo: json,
        });
    }
    render() {
        const { name, location, avatar_url } = this.state.userInfo;
        return (
            <div className="m-4 p-4 bg-gray-200 rounded-lg font-mono text-2xl">
                <img src={avatar_url} />
                <UserContext.Consumer>
                    {(data) => <h2>Name : Teja Atukuri</h2>}
                </UserContext.Consumer>

                <h3>Location: {location}</h3>
                <h4>Contact: teja219a@gmail.com</h4>
            </div>
        );
    }
}
export default UserClass;
