import React from 'react';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import { requiredValidator } from '../../../shared/utils/validation';
import styles from './BeneficiaryStepSixForm.component.module.css';

const BeneficiaryStepSixForm = props => {

	const { handleSubmit, pristine, invalid } = props

	return (
		<form onSubmit={handleSubmit}>

			<div className={styles.inlineGroup}>
				<div className={styles.formGroup}>
					<Field
						name="next_of_kin_date_of_birth"
						component={CustomInput}
						type="date"
						label="Date Of Birth"
						validate={[]}
					/>
				</div>

				<div className={styles.formGroup}>
					<Field
						name="next_of_kin_state_of_birth"
						component={CustomSelect}
						label="State Of Birth"
						validate={[]}
						options={[
							{
								displayValue: 'Osun',
								value: 'Osun'
							},
							{
								displayValue: 'Lagos',
								value: "Lagos"
							},
							{
								displayValue: 'Others',
								value: "others"
							},
						]}
					/>
				</div>
			</div>



			<div className={styles.inlineGroup}>
				<div className={styles.formGroup}>
					<Field
						name="next_of_kin_country_of_birth"
						component={CustomSelect}
						label="Country Of Birth"
						validate={[]}
						options={[
							{
								displayValue: 'Nigeria',
								value: 'Nigeria'
							},
							{
								displayValue: 'Others',
								value: 'Others'
							},
						]}
					/>
				</div>

				<div className={styles.formGroup}>
					<Field
						name="next_of_kin_local_govt_of_birth"
						component={CustomInput}
						type="text"
						label="Local Govt. Of Birth"
						validate={[]}
					/>
				</div>
			</div>



			<div className={styles.organizationFooter}>
				<div className={styles.buttonContainer}>
					<div className={styles.button}>
						<CustomButton disabled={invalid || pristine} submittingForm={props.submittingForm}>Next</CustomButton>
					</div>

					<a className={styles.cancelOrBack} onClick={props.previousStep}> Previous </a>
				</div>

				<a className={styles.link}>
				</a>
			</div>

		</form>
	);
}

export default reduxForm({
	form: 'BeneficiaryStepSixForm'
})(BeneficiaryStepSixForm);