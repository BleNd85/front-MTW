import React from 'react';
import classes from './input.module.css'

const FormInput = React.forwardRef((props, ref) => {
    const {label, ...inputProps} = props;
    return (
        <div className={classes.inputElement}>
            {label && <label className={classes.label} htmlFor={inputProps.id} {...props}>{label}</label>}
            <input {...inputProps} ref={ref} className={classes.input} {...props} />
        </div>
    )
})

export default FormInput;