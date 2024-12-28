import useFetchUser from "../components/hooks/useFetchUser";
import classes from "./style.module.css";

export default function User() {
    const {user, isLoading, error} = useFetchUser();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={classes.userPage}>
            <div className={classes.userCard}>
                <h1>User Information</h1>
                {user?.full_name}
                <h4>Username: {user?.username}</h4>
                <p>Links: {user?.links || "No links available"}</p>
            </div>
        </div>
    );
}