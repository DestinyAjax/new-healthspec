import React from 'react';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import { requiredValidator } from '../../../shared/utils/validation';
import styles from './GuestBeneficiaryStepThreeForm.component.module.css';

const GuestBeneficiaryStepThreeForm = props => {

	const { handleSubmit, pristine, invalid } = props

	return (
		<form onSubmit={handleSubmit}>

			<div className={styles.inlineGroup}>

				<div className={styles.formGroup}>
					<Field
						name="state"
						component={CustomSelect}
						label="State of Origin"
						validate={[requiredValidator]}
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

				<div className={styles.formGroup}>
					<Field
						name="address"
						component={CustomInput}
						type="text"
						label="Address"
						validate={[requiredValidator]}
					/>
				</div>

			</div>


			<div className={styles.inlineGroup}>

				<div className={styles.formGroup}>
					<Field
						name="lga"
						component={CustomInput}
						type="text"
						label="Local Govt. of Origin"
						validate={[requiredValidator]}
					/>
				</div>

				<div className={styles.formGroup}>
					<Field
						name="office_address"
						component={CustomInput}
						type="text"
						label="Office Address"
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
	form: 'GuestBeneficiaryStepThreeForm'
})(GuestBeneficiaryStepThreeForm);