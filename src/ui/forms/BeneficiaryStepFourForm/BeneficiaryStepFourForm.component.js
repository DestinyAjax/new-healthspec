import React from 'react';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import styles from './BeneficiaryStepFourForm.component.module.css';
import { requiredValidator, emailValidator } from '../../../shared/utils/validation';

const BeneficiaryStepFourForm = props => {

	const { handleSubmit, pristine, invalid } = props

	return (
		<form onSubmit={handleSubmit}>
			<div className={styles.inlineGroup}>

				<div className={styles.formGroup}>
					<Field
						name="religion"
						component={CustomSelect}
						label="Religion"
						validate={[requiredValidator]}
						options={[
							{
								displayValue: 'Christianity',
								value: 'Christianity'
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
								displayValue: 'First School Leaving Certificate',
								value: 'First School Leaving Certificate'
							},
							{
								displayValue: 'Secondary Education',
								value: 'Secondary Education'
							},
							{
								displayValue: 'Tertiary Education',
								value: 'Tertiary Education'
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


			<div className={styles.inlineGroup}>
				<div className={styles.formGroup}>
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
				</div>
				<div className={styles.formGroup}>
					<Field
						name="physical_challenge"
						component={CustomSelect}
						label="Physical Challenge"
						validate={[requiredValidator]}
						options={[
							{
								displayValue: 'None',
								value: 'None'
							},
							{
								displayValue: 'Blind',
								value: 'Blind'
							},
							{
								displayValue: 'Deaf',
								value: 'Deaf'
							},
							{
								displayValue: 'Dumb',
								value: 'Dumb'
							},
							{
								displayValue: 'Paralize',
								value: 'Paralize'
							},
							{
								displayValue: 'Others',
								value: 'Others'
							}
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
	form: 'BeneficiaryStepFourForm'
})(BeneficiaryStepFourForm);