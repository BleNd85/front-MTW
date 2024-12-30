import classes from "../pages/style.module.css";

export default function UserInfo({user}) {
    return (
        <div className={classes.userCard}>
            <h1>User Information</h1>
            <h2>{user?.full_name}</h2>
            <h3>Username: {user?.username}</h3>
            <h4>Links: {user?.links}</h4>
        </div>
    )
}