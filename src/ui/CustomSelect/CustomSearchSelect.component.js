import React from 'react';
import { Select } from 'antd';
import SelectStyleWrapper from './SelectStyle';

const CustomSearchSelect = props => {
    const { input, meta, label, placeholder, compulsory } = props;
    const inputError = (meta.invalid && meta.touched) ? "formControlError" : '';
    const inputValid = (meta.valid && meta.touched) ? "formControlValid" : '';
    const classes = `${inputError} ${inputValid}`;
    const { Option } = Select;

    return (
        <SelectStyleWrapper className="styleWrapper">
            <div className="formGroup">
                <label className="formLabel">
                    {label} {" "}
                    {compulsory && <span style={{color: 'red'}}>*</span> }
                </label>
                <Select className={classes} {...input} style={{width: '100%',marginLeft: '5px'}}>
                    <Option value="">{placeholder}</Option>
                    {props.options.map(option => (
                        <Option value={option.value} key={option.value}>{option.displayValue}</Option>
                    ))}
                </Select>
                {
                    (meta.error && meta.touched) && (
                        <span className="errorText">{meta.error}</span>
                    )
                }
            </div>
        </SelectStyleWrapper>
    );
}

export default CustomSearchSelect;