import React from 'react';
import CustomInput from '../../CustomInput';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import styles from './SearchForm.component.module.css';
import { requiredValidator } from '../../../shared/utils/validation';

const SearchForm = props => {
	
	const { handleSubmit, pristine, invalid, submittingForm } = props

	return (
		<form onSubmit={handleSubmit}>
			<div className={styles.form}>
				<div className={styles.email}>
					<Field
						name="email"
						component={CustomInput}
						type="text"
						placeholder="Find a policy that works for you"
						validate={[requiredValidator]}
					/>
				</div>
				<div className={styles.button}>
					<CustomButton disabled={invalid || pristine} submittingForm={submittingForm}>Search</CustomButton>
				</div>
			</div>
		</form>
	);

}

export default reduxForm({
	form: 'SearchForm'  
})(SearchForm);