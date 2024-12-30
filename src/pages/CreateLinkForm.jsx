import useFetching from "../components/hooks/useFetching";
import URLService from "../api/URLService";
import {useState} from "react";
import InputButton from "../components/ui/button/InputButton";
import FormInput from "../components/ui/input/FormInput";
import classes from "./style.module.css";
import Loader from "../components/ui/loader/Loader";

export default function CreateLinkForm({onNewLink}) {
    const [url, setUrl] = useState([]);
    const [response, setResponse] = useState([]);
    const [createLink, isLoading, isError] = useFetching(async () => {
        const data = await URLService.CreateLink(url);
        setResponse(data);
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createLink();
        onNewLink();
    };
    const handleRedirect = (short) => {
        const redirectUrl = `http://localhost:8000/${short}`;
        window.open(redirectUrl, "_blank");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={classes.linkForm}>
                <label htmlFor="url">Enter URL to shorten:</label>
                <FormInput
                    type="text"
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                />
            </div>
            <InputButton type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Shorten URL"}
            </InputButton>
            {isLoading ? <Loader/>
                : <>
                    {isError && <p style={{color: "black"}}>{isError}</p>}
                    {response && response.url && (
                        <div className={classes.linkFormBody}>
                            <h5 className={classes.linkFormBodyElement}>Original link: <a
                                style={{textDecoration: "none", color: "black"}} href={response.url}
                                target="_blank" rel="noopener noreferrer">{response.url}</a></h5>
                            <p className={classes.linkFormBodyElement}>By: {response.owner}</p>
                            <p className={classes.linkFormBodyElement}>Created
                                At: {new Date(response.created_at).toLocaleString()}</p>
                            <InputButton className={classes.linkFormBodyElement}
                                         onClick={() => handleRedirect(response.short)}>{response.short}</InputButton>
                        </div>
                    )}
                </>}
        </form>
    );
}