import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const err = useRouteError();
    console.log(err);
    return (
        <div>
            <h1>OOPS!!!!!</h1>
            <h1>Something Went Wrong...!!!!!</h1>
            <h2>{err.status + ":" + err.statusText}</h2>
        </div>
    );
};

export default ErrorPage;
