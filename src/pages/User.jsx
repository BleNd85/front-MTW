import useFetchUser from "../components/hooks/useFetchUser";
import classes from "./style.module.css";
import Loader from "../components/ui/loader/Loader";
import {useContext, useEffect, useState} from "react";
import useFetching from "../components/hooks/useFetching";
import URLService from "../api/URLService";
import {useNavigate} from "react-router-dom";
import UserInfo from "../components/UserInfo";
import Pagination from "../components/Pagination";
import LinkList from "../components/LinkList";
import {AuthContext} from "../context";

export default function User() {
    const {user, isLoading: userIsLoading, error: userError} = useFetchUser();
    const [currentPage, setCurrentPage] = useState(1);
    const [urls, setUrl] = useState([]);
    const [fetchUrls, isLoading, isError] = useFetching(async (page) => {
        const data = await URLService.getUrls(page)
        setUrl(data);
    });
    const {setRefreshUrls} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRedirect = (short) => {
        const redirectUrl = `http://localhost:8000/${short}`;
        window.open(redirectUrl, "_blank");
    };

    useEffect(() => {
        if (user) {
            fetchUrls(currentPage);
        }
        setRefreshUrls(() => fetchUrls);
    }, [user, currentPage]);

    const handlePrevious = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage((prev) => prev + 1);
    };

    const isNextDisabled = urls.length < 10;

    return (
        <div className={classes.userPage}>
            {userIsLoading || isLoading ? (
                <Loader/>
            ) : (
                <>
                    {userError && <p>{userError}</p>}
                    {isError && <p>{isError}</p>}
                    <UserInfo user={user}/>
                </>
            )}
            {urls.length > 0 && (
                <div className={classes.linksCard}>
                    <Pagination
                        currentPage={currentPage}
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                        isNextDisabled={isNextDisabled}/>
                    <LinkList
                        onNavigate={navigate}
                        onRedirect={handleRedirect}
                        urls={urls}
                        onNewLink={() => fetchUrls(currentPage)}/>
                </div>)}
        </div>
    );
}