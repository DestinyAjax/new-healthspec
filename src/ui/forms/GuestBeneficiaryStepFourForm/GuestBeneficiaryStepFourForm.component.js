import React from 'react';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import styles from './GuestBeneficiaryStepFourForm.component.module.css';
import { requiredValidator, emailValidator } from '../../../shared/utils/validation';

const GuestBeneficiaryStepFourForm = props => {

	const { handleSubmit, pristine, invalid } = props

	return (
		<form onSubmit={handleSubmit}>

			<Field
				name="marital_status"
				component={CustomSelect}
				label="Marital Status"
				validate={[requiredValidator]}
				options={[
					{
						displayValue: 'Married',
						value: 'married'
					},
					{
						displayValue: 'Single',
						value: 'Single'
					},
					{
						displayValue: 'Divorce',
						value: 'Divorce'
					},
				]}
			/>


			<div className={styles.inlineGroup}>

				<div className={styles.formGroup}>
					<Field
						name="religion"
						component={CustomSelect}
						label="Religion"
						validate={[requiredValidator]}
						options={[
							{
								displayValue: 'Christainity',
								value: 'Christainity'
							},
							{
								displayValue: 'Islam',
								value: 'Islam'
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
						name="highest_education_level"
						component={CustomSelect}
						label="Highest Education Level"
						validate={[requiredValidator]}
						options={[
							{
								displayValue: 'First Secondary School',
								value: 'First Secondary School'
							},
							{
								displayValue: 'Secondary School',
								value: 'Secondary School'
							},
							{
								displayValue: 'Bsc',
								value: 'Bsc'
							},
							{
								displayValue: 'Masters',
								value: 'Masters'
							},
							{
								displayValue: 'Phd',
								value: 'Phd'
							},
						]}
					/>
				</div>

			</div>


			<div className={styles.inlineGroup}>

				<div className={styles.formGroup}>
					<Field
						name="email"
						component={CustomInput}
						type="email"
						label="Email"
						validate={[requiredValidator, emailValidator]}
					/>
				</div>

				<div className={styles.formGroup}>
					<Field
						name="job_name"
						component={CustomInput}
						type="text"
						label="Job name"
						validate={[requiredValidator]}
					/>
				</div>

			</div>


			<div className={styles.organizationFooter}>
				<div className={styles.buttonContainer}>
					<div className={styles.button}>
						<CustomButton disabled={invalid || pristine}>Next</CustomButton>
					</div>

					<a className={styles.cancelOrBack}>
						Cancel
					</a>
				</div>

				<a className={styles.link}></a>
			</div>

		</form>
	);
}

export default reduxForm({
	form: 'GuestBeneficiaryStepFourForm'  
})(GuestBeneficiaryStepFourForm);