import React from 'react';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import { requiredValidator } from '../../../shared/utils/validation';
import styles from './BeneficiaryStepFiveForm.component.module.css';

const BeneficiaryStepFiveForm = props => {

	const { handleSubmit, pristine, invalid } = props

	return (
		<form onSubmit={handleSubmit}>
			<div className={styles.inlineGroup}>
				<div className={styles.formGroup}>
					<Field
						name="next_of_kin_surname"
						component={CustomInput}
						type="text"
						label="Next Of Kin Surname"
						validate={[]}
					/>
				</div>

				<div className={styles.formGroup}>
					<Field
						name="next_of_kin_firstname"
						component={CustomInput}
						type="text"
						label="Next Of Kin Firstname"
						validate={[]}
					/>
				</div>
			</div>



			<div className={styles.inlineGroup}>
				<div className={styles.formGroup}>
					<Field
						name="next_of_kin_middlename"
						component={CustomInput}
						type="text"
						label="Next Of Kin Middlename"
						validate={[]}
					/>
				</div>

				<div className={styles.formGroup}>
					<Field
						name="relationship_with_next_of_kin"
						component={CustomInput}
						type="text"
						label="Relationship With Next Of Kin"
						validate={[]}
					/>
				</div>
			</div>


			<div className={styles.inlineGroup}>
				<div className={styles.formGroup}>
					<Field
						name="next_of_kin_occupation"
						component={CustomInput}
						type="text"
						label="Next Of Kin Occupation"
						validate={[]}
					/>
				</div>

				<div className={styles.formGroup}>
					<Field
						name="next_of_kin_address"
						component={CustomInput}
						type="text"
						label="Next Of Kin Address"
						validate={[]}
					/>
				</div>
			</div>



			<div className={styles.inlineGroup}>

				<div className={styles.formGroup}>
					<Field
						name="next_of_kin_lga"
						component={CustomInput}
						type="text"
						label="Next of Kin LGA"
						validate={[]}
					/>
				</div>

				<div className={styles.formGroup}>
					<Field
						name="next_of_kin_state"
						component={CustomSelect}
						label="Next Of Kin State"
						validate={[]}
						options={[
							{
								displayValue: 'Osun',
								value: 'Osun'
							},
							{
								displayValue: 'Lagos',
								value: 'Lagos'
							},
							{
								displayValue: 'Others',
								value: 'Others'
							},
						]}
					/>
				</div>

			</div>



			<div className={styles.organizationFooter}>
				<div className={styles.buttonContainer}>
					<div className={styles.button}>
						<CustomButton disabled={invalid || pristine}>Next</CustomButton>
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
	form: 'BeneficiaryStepFiveForm'
})(BeneficiaryStepFiveForm);