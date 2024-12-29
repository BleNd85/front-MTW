import useFetchUser from "../components/hooks/useFetchUser";
import classes from "./style.module.css";
import Loader from "../components/ui/loader/Loader";
import {useEffect, useState} from "react";
import useFetching from "../components/hooks/useFetching";
import URLService from "../api/URLService";

export default function User() {
    const {user, isLoading: userIsLoading, error: userError} = useFetchUser();
    const [urls, setUrl] = useState([]);
    const [fetchUrls, isLoading, isError] = useFetching(async () => {
        const data = await URLService.getUrls()
        setUrl(data);
    });

    useEffect(() => {
        if (user) {
            fetchUrls();
        }
    }, [user]);

    //todo break into 2 cards
    return (
        <div className={classes.userPage}>
            {userIsLoading || isLoading ? (
                <Loader/>
            ) : (
                <div className={classes.userCard}>
                    {userError && <p>{userError}</p>}
                    {isError && <p>{isError}</p>}
                    <h1>User Information</h1>
                    {user?.full_name}
                    <h4>Username: {user?.username}</h4>
                    <p>Links:</p>
                    {urls.length > 0 ? (
                        <ul>
                            {urls.map((url, index) => (
                                <li key={index}>
                                    <a href={url.url} target="_blank" rel="noopener noreferrer">{url.short}</a>
                                    <p>Redirects: {url.redirects}</p>
                                    <p>Created At: {new Date(url.created_at).toLocaleString()}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No links available</p>
                    )}
                </div>
            )}
        </div>
    );
}