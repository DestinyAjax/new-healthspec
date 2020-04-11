/**
 * Email validation
 *
 * @param value
 * @return
 */
export const emailValidator = value => {
	return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;
}



/**
 * minLength Val
 * @param  value
 * @param  minLength
 * @return
 */
const minLengthValidator = length => {
	return value => {
		return value && value.length > length ? undefined : `Must be ${length} characters or more`;
	}
}
export const minLength5 = minLengthValidator(5);
export const minLength10 = minLengthValidator(10);




/**
 * maxLength Val
 * @param  value
 * @param  minLength
 * @return
 */
const maxLengthValidator = length => {
	return value => {
		return value && value.length > length ? `Must be ${length} characters or less` : undefined;
	}
}
export const maxLength8 = maxLengthValidator(8);
export const maxLength11 = maxLengthValidator(11);


/**
 * Check to confirm that field is required
 *
 * @param  value
 * @return
 */
export const requiredValidator = value => value ? undefined : 'Value is required';


export const matchesPassword = (value, allValues) => value === allValues.password ? undefined : 'Passwords must match';


export const maxDate = value => Date.parse(new Date()) > Date.parse(value) ? undefined : 'Date is greater than today';

/**
 * Check image type and size
 */
export const imageValidator = (file, $this) => {
	const allowedType = ["image/jpg", "image/png", "image/jpeg", "image/gif"];
	let message;
	if(!allowedType.includes(file.type)) {
		message = "Please upload an image having extensions .jpeg/.jpg/.png/.gif only.";
		return [false, message, "type"];
	}
	if(file.size > $this.props.size) {
		message = "Too large! Max size allowed is 500kb"
		return [false, message, "size"];
	}
	return [true, ''];
}