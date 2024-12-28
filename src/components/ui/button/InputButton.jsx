import classes from './button.module.css';

export default function InputButton({children, ...props}) {
    return (
        <button {...props} className={classes.button}>{children}</button>
    )
}