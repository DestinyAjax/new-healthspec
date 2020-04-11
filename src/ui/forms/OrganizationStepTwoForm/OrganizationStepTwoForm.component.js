import React from 'react';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import styles from './OrganizationStepTwoForm.component.module.css';
import { requiredValidator } from '../../../shared/utils/validation';

const OrganizationStepOneForm = props => {

	const { handleSubmit, pristine, invalid, submittingForm } = props

	return (
		<form onSubmit={handleSubmit}>
			<div className="row">
				<div className="col-md-6">
					<Field
						name="bank_name"
						component={CustomSelect}
						label="Organization bank name"
						validate={[requiredValidator]}
						options={[
							{
								displayValue: 'GTB',
								value: 'GTB'
							},
							{
								displayValue: 'UNION BANK',
								value: 'UNION BANK'
							},
						]}
					/>
				</div>
				<div className="col-md-6">
					<Field
						name="account_name"
						component={CustomInput}
						type="text"
						label="Account Name"
						validate={[requiredValidator]}
					/>
				</div>
				<div className="col-md-6">
					<Field
						name="account_number"
						component={CustomInput}
						type="number"
						label="Account Number"
						validate={[requiredValidator]}
					/>
				</div>
			</div>
			<div className={styles.footer}>
				<div className={styles.buttonContainer}>
					<div className={styles.button}>
						<CustomButton disabled={invalid || pristine} submittingForm={submittingForm}>Next</CustomButton>
					</div>
					<a className={styles.cancelOrBack} onClick={props.previousStep}>
						Previous
					</a>
				</div>
			</div>
		</form>
	);
}

export default reduxForm({
	form: 'OrganizationStepOneForm'
})(OrganizationStepOneForm);