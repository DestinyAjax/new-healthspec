import React from 'react';
import CustomInputWrapper from './CustomInput.component.styles.js';

const CustomInput = props => {

    const { input, meta, type, label, placeholder } = props;
    const inputError = (meta.invalid && meta.touched) ? 'formControlError' : '';
    const inputValid = (meta.valid && meta.touched) ? 'formControlValid' : '';
    const classes = `formSearchControl ${inputError} ${inputValid}`;

    return (
        <CustomInputWrapper className="customerWrapper">
            <div className="formGroup">
                <label className="formLabel">{label}</label>
                <input {...input} type={type} placeholder={placeholder} className={classes} {...props} />
                {(meta.error && meta.touched) && (<div className="errorText">{meta.error}</div>)}
            </div>
        </CustomInputWrapper>
    );

}

export default CustomInput;