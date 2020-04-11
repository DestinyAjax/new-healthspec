import React from 'react';
import Input from '@iso/components/uielements/input';
import CustomInputWrapper from './CustomInput.component.styles';

const CustomInput = props => {
	const { input, meta, type, label, placeholder, compulsory } = props;
	const inputError = (meta.invalid && meta.touched) ? 'formControlError' : '';
	const inputValid = (meta.valid && meta.touched) ? 'formControlValid' : '';
	const classes = `form-control custom ${inputError} ${inputValid}`;

	return (
		<CustomInputWrapper className="customerWrapper">
			<div className="formGroup">
				<label className="formLabel">
					{label} {" "}
					{compulsory && <span style={{color: 'red'}}>*</span> }
				</label>
				<Input
					{...input}
					type={type}
					placeholder={placeholder}
					className={classes} {...props}
				/>
				{
					(meta.error && meta.touched) && (
						<span className="errorText">{meta.error}</span>
					)
				}
			</div>
		</CustomInputWrapper>
	);
}

export default CustomInput;