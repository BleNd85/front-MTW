import classes from "../pages/style.module.css";
import InputButton from "./ui/button/InputButton";

export default function LinkList({urls, onRedirect, onNavigate, onNewLink}) {
    return (
        <ul>
            {urls.map((url, index) => (
                <li key={index} className={classes.linkButton}>
                    <div>
                        <p style={{fontWeight: "bold"}}>Link to:</p>
                        <a className={classes.linkUrl} href={url.url}>
                            {url.url}
                        </a>
                        <p style={{fontWeight: "bold"}}>Redirects: {url.redirects}</p>
                        <p style={{fontWeight: "bold"}}>Created At: {new Date(url.created_at).toLocaleString()}</p>
                    </div>
                    <div className={classes.linkEnd}>
                        <InputButton
                            onClick={() => onNavigate(`/me/links/${url.short}`)}
                        >
                            Details
                        </InputButton>
                        <InputButton
                            onClick={() => {
                                onRedirect(url.short);
                                onNewLink()
                            }}
                        >
                            {url.short}
                        </InputButton>
                    </div>
                </li>
            ))}
        </ul>)
}